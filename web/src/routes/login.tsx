import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useUserStore } from "@/store/use-user-store";
import { SYSTEM_DATA } from "@/lib/const";
import { useAuthLayout } from "@/hooks/use-auth-layout";
import { AuthForm } from "@/features/Auth/components/AuthForm";
import { AuthFormField } from "@/features/Auth/components/AuthFormField";
import { AuthFormControl } from "@/features/Auth/components/AuthFormControl";
import { AuthFormError } from "@/features/Auth/components/AuthFormError";
import { AuthFormAction } from "@/features/Auth/components/AuthFormAction";
import { AuthFormAlternative } from "@/features/Auth/components/AuthFormAlternative";
import { AuthFormNavigation } from "@/features/Auth/components/AuthFormNavigation";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Modular layout management via hook
  useAuthLayout({
    title: "Welcome back",
    description: "Please enter your credentials to access Prosper",
    isTyping,
    isPasswordHidden: !showPassword && password.length > 0,
    isPasswordVisible: showPassword && password.length > 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === "info@ously.com" && password === "1234") {
      setUser(SYSTEM_DATA.mockUser);
      navigate({ to: "/" });
    } else {
      setError("Invalid email or password. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <AuthForm onSubmit={handleSubmit}>
        <AuthFormField
          id="email"
          label="Email"
          type="email"
          placeholder="erik@gmail.com"
          value={email}
          icon={Mail}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          required
        />

        <AuthFormField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          icon={Mail} // Placeholder icon for password field container
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          required
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          }
        />

        <AuthFormControl />

        <AuthFormError message={error} />

        <AuthFormAction
          isLoading={isLoading}
          label="Log in"
          loadingLabel="Signing in..."
        />
      </AuthForm>

      <AuthFormAlternative label="Log in with Google" />

      <AuthFormNavigation>
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-foreground font-medium hover:underline"
        >
          Sign Up
        </Link>
      </AuthFormNavigation>
    </>
  );
}
