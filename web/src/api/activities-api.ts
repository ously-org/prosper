import { activities } from "./state";
import { delay } from "./utils";

export async function fetchActivities() {
  await delay(300);
  return activities;
}
