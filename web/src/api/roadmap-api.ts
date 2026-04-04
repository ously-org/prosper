import { branches } from "./state";
import { delay } from "./utils";

export async function fetchBranches() {
  await delay(300);
  return branches;
}
