import { useUserStore } from "@/store/use-user-store";

export function useCurrentUser() {
  const { user, setUser, isLoading, setIsLoading } = useUserStore();
  return { user, setUser, isLoading, setIsLoading };
}
