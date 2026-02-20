import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, Tractor, ShoppingCart, Truck, Warehouse } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type Role = "farmer" | "buyer" | "transporter" | "storage_provider";

const roles: { value: Role; icon: React.ElementType; labelKey: string; descKey: string }[] = [
  { value: "farmer", icon: Tractor, labelKey: "farmer", descKey: "roleDescription_farmer" },
  { value: "buyer", icon: ShoppingCart, labelKey: "buyer", descKey: "roleDescription_buyer" },
  { value: "transporter", icon: Truck, labelKey: "transporter", descKey: "roleDescription_transporter" },
  { value: "storage_provider", icon: Warehouse, labelKey: "storageProvider", descKey: "roleDescription_storageProvider" },
];

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({ title: "Error", description: t("selectRole"), variant: "destructive" });
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role: selectedRole },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    // Insert role
    if (data.user) {
      await supabase.from("user_roles").insert({ user_id: data.user.id, role: selectedRole });
    }

    setLoading(false);
    toast({ title: t("signupSuccess") });
    navigate("/auth/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-lg space-y-8">
        <div className="flex flex-col items-center gap-2">
          <Sprout className="h-10 w-10 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">{t("createAccount")}</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">{t("fullName")}</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>

          <div className="space-y-3">
            <Label>{t("selectRole")}</Label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => {
                const Icon = r.icon;
                return (
                  <motion.button
                    key={r.value}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedRole(r.value)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                      selectedRole === r.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="text-sm font-semibold text-foreground">{t(r.labelKey)}</span>
                    <span className="text-xs text-muted-foreground">{t(r.descKey)}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("signingUp") : t("signup")}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {t("hasAccount")}{" "}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
