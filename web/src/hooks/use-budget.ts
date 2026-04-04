import { useQuery } from "@tanstack/react-query";
import { fetchIncome, fetchExpenses } from "@/api/finance-api";

export function useIncome() {
  return useQuery({
    queryKey: ["income"],
    queryFn: fetchIncome,
  });
}

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });
}
