import { useQuery } from "@tanstack/react-query";
import { fetchAllSiteContent } from "@/lib/siteContent";

/**
 * Reads one editable content section, merged over its defaults so any field the
 * admin hasn't customised keeps the original copy. All sections share a single
 * cached fetch (React Query dedupes by queryKey), so multiple components on a
 * page trigger only one request.
 */
export function useSiteContent<T extends object>(
  key: string,
  defaults: T,
): { content: T; isLoading: boolean } {
  const { data, isLoading } = useQuery<Record<string, any>>({
    queryKey: ["site_content"],
    staleTime: 5 * 60 * 1000,
    queryFn: fetchAllSiteContent,
  });

  const raw = data?.[key];
  const content = raw && typeof raw === "object" ? { ...defaults, ...raw } : defaults;
  return { content, isLoading };
}
