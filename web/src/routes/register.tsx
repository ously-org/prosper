import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, ShieldCheck } from "lucide-react";
import { useAuthLayout } from "@/hooks/use-auth-layout";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthFormField } from "@/components/auth/AuthFormField";
import { AuthFormError } from "@/components/auth/AuthFormError";
import { AuthFormAction } from "@/components/auth/AuthFormAction";
import { AuthFormAlternative } from "@/components/auth/AuthFormAlternative";
import { AuthFormNavigation } from "@/components/auth/AuthFormNavigation";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isPasswordHidden =
    (!showPassword && password.length > 0) ||
    (!showConfirmPassword && confirmPassword.length > 0);

  const isPasswordVisible =
    (showPassword && password.length > 0) ||
    (showConfirmPassword && confirmPassword.length > 0);

  // Modular layout management via hook
  useAuthLayout({
    title: "Create account",
    description: "Join Prosper to start your financial journey",
    isTyping,
    isPasswordHidden,
    isPasswordVisible,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    // Mock registration delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate({ to: "/login" });
  };

  return (
    <>
      <AuthForm onSubmit={handleSubmit}>
        <AuthFormField
          id="name"
          label="Full Name"
          placeholder="Erik Magnus"
          value={name}
          icon={User}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          required
        />

        <AuthFormField
          id="email"
          label="Email address"
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
          icon={ShieldCheck}
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
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          }
        />

        <AuthFormField
          id="confirm-password"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="••••••••"
          value={confirmPassword}
          icon={ShieldCheck}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          required
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          }
        />

        <AuthFormError message={error} />

        <AuthFormAction
          isLoading={isLoading}
          label="Get started"
          loadingLabel="Creating account..."
        />
      </AuthForm>

      <AuthFormAlternative label="Sign up with Google" />

      <AuthFormNavigation>
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-foreground font-medium hover:underline"
        >
          Sign in
        </Link>
      </AuthFormNavigation>
    </>
  );
}
