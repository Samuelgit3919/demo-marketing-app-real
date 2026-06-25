import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Testimonial } from "@/types";

export function useTestimonials() {
  const { data: testimonials = [], isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  const hasTestimonials = testimonials.length > 0;

  return { testimonials, isLoading, error, hasTestimonials };
}
