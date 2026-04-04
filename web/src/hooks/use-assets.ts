import { useQuery } from "@tanstack/react-query";
import { fetchAssets } from "@/api/finance-api";

export function useAssets() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });
}
