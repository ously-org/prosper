import type { Liability, LiabilityChange } from "@/lib/model/Liability";
import { applyLiabilityChange } from "@/lib/model/Liability";
import { liabilities, setLiabilities } from "./state";
import { delay } from "./utils";

export async function fetchLiabilities() {
  await delay(300);
  return liabilities;
}

export async function updateLiability(liability: Liability) {
  await delay(300);
  setLiabilities(liabilities.map((l) => (l.id === liability.id ? liability : l)));
  return liability;
}

export async function addLiability(liability: Liability) {
  await delay(300);
  setLiabilities([...liabilities, liability]);
  return liability;
}

export async function deleteLiability(id: string) {
  await delay(300);
  setLiabilities(liabilities.filter((l) => l.id !== id));
}

export function internalApplyLiabilityChange(id: string, change: LiabilityChange) {
  setLiabilities(liabilities.map((l) => (l.id === id ? applyLiabilityChange(l, change) : l)));
}

export function internalReplaceLiability(id: string, liability: Liability) {
  setLiabilities(liabilities.map((l) => (l.id === id ? liability : l)));
}
