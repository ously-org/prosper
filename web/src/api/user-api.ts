import type { User } from "@/lib/model/User";
import { user, setUser } from "./state";
import { delay } from "./utils";

export async function fetchUser() {
  await delay(300);
  return user;
}

export async function updateUser(updatedUser: Partial<User>) {
  await delay(300);
  setUser({ ...user, ...updatedUser });
  return user;
}
