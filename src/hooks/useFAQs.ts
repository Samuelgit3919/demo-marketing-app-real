import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { FAQ } from "@/types";

export function useFAQs() {
  const { data: faqs = [], isLoading, error } = useQuery<FAQ[]>({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  return { faqs, isLoading, error };
}
