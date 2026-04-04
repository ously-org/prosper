import React from "react";
import { DataEntities } from "@/layout/auth/characters/DataEntities";
import { AuthHeader } from "@/layout/auth/AuthHeader";
import { AuthFooter } from "@/layout/auth/AuthFooter";
import { AuthWrapper } from "@/layout/auth/AuthWrapper";
import { useAuthStore } from "@/store/use-auth-store";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { isTyping, isPasswordHidden, isPasswordVisible } = useAuthStore();

  return (
    <div className="min-h-screen grid lg:grid-cols-2 overflow-hidden bg-background">
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary/95 via-primary to-primary/90 p-12 text-primary-foreground border-r border-border/10">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

        <AuthHeader />

        <div className="relative z-20 flex-1 flex items-center justify-center">
          <DataEntities
            isTyping={isTyping}
            isPasswordHidden={isPasswordHidden}
            isPasswordVisible={isPasswordVisible}
          />
        </div>

        <AuthFooter />
      </div>

      <AuthWrapper>
        {children}
      </AuthWrapper>
    </div>
  );
}
