
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('farmer', 'buyer', 'transporter', 'storage_provider', 'admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  language TEXT DEFAULT 'en',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Farmer profiles
CREATE TABLE public.farmer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  land_size NUMERIC,
  soil_type TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  budget NUMERIC,
  previous_crops JSONB DEFAULT '[]',
  current_crop BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.farmer_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Farmers can manage own profile" ON public.farmer_profiles
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all farmer profiles" ON public.farmer_profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Buyer profiles
CREATE TABLE public.buyer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  business_name TEXT,
  gst_number TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.buyer_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Buyers can manage own profile" ON public.buyer_profiles
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all buyer profiles" ON public.buyer_profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Crops
CREATE TABLE public.crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  crop_name TEXT NOT NULL,
  sowing_date DATE,
  growth_stage TEXT,
  expected_yield NUMERIC,
  health_score NUMERIC,
  harvest_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Farmers can manage own crops" ON public.crops
  FOR ALL USING (auth.uid() = farmer_id);
CREATE POLICY "Admins can view all crops" ON public.crops
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Listings
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE NOT NULL,
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quantity NUMERIC NOT NULL,
  price NUMERIC NOT NULL,
  video_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Farmers can manage own listings" ON public.listings
  FOR ALL USING (auth.uid() = farmer_id);
CREATE POLICY "Buyers can view approved listings" ON public.listings
  FOR SELECT USING (status = 'approved');
CREATE POLICY "Admins can manage all listings" ON public.listings
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quantity NUMERIC NOT NULL,
  agreed_price NUMERIC NOT NULL,
  transport_needed BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Buyers can manage own orders" ON public.orders
  FOR ALL USING (auth.uid() = buyer_id);
CREATE POLICY "Admins can manage all orders" ON public.orders
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Expenses
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Farmers can manage own expenses" ON public.expenses
  FOR ALL USING (auth.uid() = farmer_id);

-- Transporters
CREATE TABLE public.transporters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  vehicle_type TEXT,
  capacity NUMERIC,
  routes JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.transporters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Transporters can manage own profile" ON public.transporters
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone authenticated can view transporters" ON public.transporters
  FOR SELECT TO authenticated USING (true);

-- Storage providers
CREATE TABLE public.storage_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  capacity NUMERIC,
  cost_per_day NUMERIC,
  location_lat NUMERIC,
  location_lng NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.storage_providers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Storage providers can manage own profile" ON public.storage_providers
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone authenticated can view storage providers" ON public.storage_providers
  FOR SELECT TO authenticated USING (true);

-- Price history
CREATE TABLE public.price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name TEXT NOT NULL,
  mandi_price NUMERIC,
  platform_price NUMERIC,
  date DATE DEFAULT CURRENT_DATE
);
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view price history" ON public.price_history
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage price history" ON public.price_history
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
