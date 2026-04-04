import React from "react";
import { useAuthStore } from "@/store/use-auth-store";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({
  children,
}: AuthWrapperProps) => {
  const { title, description } = useAuthStore();
  
  return (
    <div className="flex items-center justify-center p-8 bg-background relative">
      {/* Subtle decorative element for the form side */}
      <div className="absolute top-0 right-0 p-8">
        <div className="text-[10rem] font-bold text-foreground/[0.02] select-none pointer-events-none leading-none">
          PROSPER
        </div>
      </div>

      <div className="w-full max-w-[420px] relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2 font-display">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
