import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [profileStatus, setProfileStatus] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          // Fetch role
          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", currentUser.id)
            .single();
          setRole(roleData?.role ?? null);

          // Fetch profile status
          const { data: profile } = await supabase
            .from("profiles")
            .select("status")
            .eq("user_id", currentUser.id)
            .single();
          setProfileStatus(profile?.status ?? null);
        } else {
          setRole(null);
          setProfileStatus(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return { user, loading, role, profileStatus, signOut };
};
