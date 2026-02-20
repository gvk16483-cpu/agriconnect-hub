export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      buyer_profiles: {
        Row: {
          business_name: string | null
          created_at: string | null
          gst_number: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          user_id: string
        }
        Insert: {
          business_name?: string | null
          created_at?: string | null
          gst_number?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          user_id: string
        }
        Update: {
          business_name?: string | null
          created_at?: string | null
          gst_number?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          user_id?: string
        }
        Relationships: []
      }
      crops: {
        Row: {
          created_at: string | null
          crop_name: string
          expected_yield: number | null
          farmer_id: string
          growth_stage: string | null
          harvest_date: string | null
          health_score: number | null
          id: string
          sowing_date: string | null
        }
        Insert: {
          created_at?: string | null
          crop_name: string
          expected_yield?: number | null
          farmer_id: string
          growth_stage?: string | null
          harvest_date?: string | null
          health_score?: number | null
          id?: string
          sowing_date?: string | null
        }
        Update: {
          created_at?: string | null
          crop_name?: string
          expected_yield?: number | null
          farmer_id?: string
          growth_stage?: string | null
          harvest_date?: string | null
          health_score?: number | null
          id?: string
          sowing_date?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          date: string | null
          farmer_id: string
          id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          date?: string | null
          farmer_id: string
          id?: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          date?: string | null
          farmer_id?: string
          id?: string
        }
        Relationships: []
      }
      farmer_profiles: {
        Row: {
          budget: number | null
          created_at: string | null
          current_crop: boolean | null
          id: string
          land_size: number | null
          location_lat: number | null
          location_lng: number | null
          previous_crops: Json | null
          soil_type: string | null
          user_id: string
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          current_crop?: boolean | null
          id?: string
          land_size?: number | null
          location_lat?: number | null
          location_lng?: number | null
          previous_crops?: Json | null
          soil_type?: string | null
          user_id: string
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          current_crop?: boolean | null
          id?: string
          land_size?: number | null
          location_lat?: number | null
          location_lng?: number | null
          previous_crops?: Json | null
          soil_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          created_at: string | null
          crop_id: string
          farmer_id: string
          id: string
          price: number
          quantity: number
          status: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          crop_id: string
          farmer_id: string
          id?: string
          price: number
          quantity: number
          status?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          crop_id?: string
          farmer_id?: string
          id?: string
          price?: number
          quantity?: number
          status?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          agreed_price: number
          buyer_id: string
          created_at: string | null
          id: string
          listing_id: string
          quantity: number
          status: string | null
          transport_needed: boolean | null
        }
        Insert: {
          agreed_price: number
          buyer_id: string
          created_at?: string | null
          id?: string
          listing_id: string
          quantity: number
          status?: string | null
          transport_needed?: boolean | null
        }
        Update: {
          agreed_price?: number
          buyer_id?: string
          created_at?: string | null
          id?: string
          listing_id?: string
          quantity?: number
          status?: string | null
          transport_needed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      price_history: {
        Row: {
          crop_name: string
          date: string | null
          id: string
          mandi_price: number | null
          platform_price: number | null
        }
        Insert: {
          crop_name: string
          date?: string | null
          id?: string
          mandi_price?: number | null
          platform_price?: number | null
        }
        Update: {
          crop_name?: string
          date?: string | null
          id?: string
          mandi_price?: number | null
          platform_price?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          language: string | null
          phone: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          language?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          language?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      storage_providers: {
        Row: {
          capacity: number | null
          cost_per_day: number | null
          created_at: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          user_id: string
        }
        Insert: {
          capacity?: number | null
          cost_per_day?: number | null
          created_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          user_id: string
        }
        Update: {
          capacity?: number | null
          cost_per_day?: number | null
          created_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          user_id?: string
        }
        Relationships: []
      }
      transporters: {
        Row: {
          capacity: number | null
          created_at: string | null
          id: string
          routes: Json | null
          user_id: string
          vehicle_type: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          id?: string
          routes?: Json | null
          user_id: string
          vehicle_type?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          id?: string
          routes?: Json | null
          user_id?: string
          vehicle_type?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "farmer"
        | "buyer"
        | "transporter"
        | "storage_provider"
        | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["farmer", "buyer", "transporter", "storage_provider", "admin"],
    },
  },
} as const
