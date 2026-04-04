import { useQuery } from "@tanstack/react-query";
import { fetchGoals, fetchBranches } from "@/api/finance-api";

export function useGoals() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });
}

export function useBranches() {
  return useQuery({
    queryKey: ["branches"],
    queryFn: fetchBranches,
  });
}
