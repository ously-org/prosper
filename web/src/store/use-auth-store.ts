import { create } from "zustand";

interface AuthStore {
  title: string;
  description: string;
  isTyping: boolean;
  isPasswordHidden: boolean;
  isPasswordVisible: boolean;
  setAuthHeader: (title: string, description: string) => void;
  setCharState: (state: Partial<Pick<AuthStore, "isTyping" | "isPasswordHidden" | "isPasswordVisible">>) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  title: "Welcome back",
  description: "Please enter your credentials to access Prosper",
  isTyping: false,
  isPasswordHidden: false,
  isPasswordVisible: false,
  setAuthHeader: (title, description) => set({ title, description }),
  setCharState: (state) => set((s) => ({ ...s, ...state })),
  reset: () =>
    set({
      title: "Welcome back",
      description: "Please enter your credentials to access Prosper",
      isTyping: false,
      isPasswordHidden: false,
      isPasswordVisible: false,
    }),
}));
