import type { FinancialState } from "@/lib/model/FinancialState";
import { assets, liabilities, income, expenses } from "./state";
import { delay } from "./utils";

export async function fetchFinancialState(): Promise<FinancialState> {
  await delay(500);
  return {
    assets,
    liabilities,
    income,
    expenses,
  };
}
