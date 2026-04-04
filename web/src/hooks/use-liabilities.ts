import { useQuery } from "@tanstack/react-query";
import { fetchLiabilities } from "@/api/finance-api";

export function useLiabilities() {
  return useQuery({
    queryKey: ["liabilities"],
    queryFn: fetchLiabilities,
  });
}
