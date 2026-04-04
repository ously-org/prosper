import { useEffect } from "react";
import { useAuthStore } from "@/store/use-auth-store";

interface AuthLayoutOptions {
  title?: string;
  description?: string;
  isTyping?: boolean;
  isPasswordHidden?: boolean;
  isPasswordVisible?: boolean;
}

export function useAuthLayout(options: AuthLayoutOptions) {
  const { setAuthHeader, setCharState } = useAuthStore();

  useEffect(() => {
    if (options.title && options.description) {
      setAuthHeader(options.title, options.description);
    }
  }, [options.title, options.description]);

  useEffect(() => {
    setCharState({
      isTyping: options.isTyping,
      isPasswordHidden: options.isPasswordHidden,
      isPasswordVisible: options.isPasswordVisible,
    });
  }, [options.isTyping, options.isPasswordHidden, options.isPasswordVisible]);

  // Optionally reset on unmount if needed, but usually we want to keep state briefly
  // useEffect(() => {
  //   return () => reset();
  // }, []);
}
