import { useQuery } from "@tanstack/react-query";
import { fetchFinancialState, fetchActivities } from "@/api/finance-api";

export function useFinancialState() {
  return useQuery({
    queryKey: ["financial-state"],
    queryFn: fetchFinancialState,
  });
}

export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });
}
