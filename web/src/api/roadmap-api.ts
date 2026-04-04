import { branches, commits } from "./state";
import { delay } from "./utils";

export async function fetchBranches() {
  await delay(300);
  return branches;
}

export async function fetchCommits() {
  await delay(300);
  return commits;
}
