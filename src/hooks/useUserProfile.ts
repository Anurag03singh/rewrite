import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id: string;
  full_name: string | null;
  is_premium: boolean;
  premium_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return null;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        // If profile doesn't exist, create it
        if (error.code === "PGRST116") {
          const { data: newProfile, error: insertError } = await supabase
            .from("user_profiles")
            .insert({
              id: user.id,
              full_name: user.user_metadata?.full_name || null,
            })
            .select()
            .single();

          if (insertError) throw insertError;
          return newProfile as UserProfile;
        }
        throw error;
      }

      return data as UserProfile;
    },
  });
};
