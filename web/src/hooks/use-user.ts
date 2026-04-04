import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchUser, updateUser } from "@/api/finance-api";
import { queryClient } from "@/lib/query-client";
import type { User } from "@/lib/model/User";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: (updatedUser: Partial<User>) => updateUser(updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
