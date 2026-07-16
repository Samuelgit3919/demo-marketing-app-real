import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ContactInfo } from "@/types";

export function useContactInfo() {
  const { data: contactInfo, isLoading, error } = useQuery<ContactInfo | null>({
    queryKey: ["contactInfo"],
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .limit(1)
        .single();

      if (error && error.code === "PGRST116") return null;
      if (error) throw error;
      return data;
    },
  });

  return { contactInfo, isLoading, error };
}
