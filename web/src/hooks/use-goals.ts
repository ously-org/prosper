import { useQuery } from "@tanstack/react-query";
import { fetchGoals } from "@/api/finance-api";

export function useGoals() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });
}
