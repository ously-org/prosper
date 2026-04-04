import { useQuery } from "@tanstack/react-query";
import { fetchGoals, fetchBranches, fetchCommits } from "@/api/finance-api";

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

export function useCommits() {
  return useQuery({
    queryKey: ["commits"],
    queryFn: fetchCommits,
  });
}
