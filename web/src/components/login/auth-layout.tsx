import React from "react";
import Logo from "@/assets/logo.svg";
import { Link } from "@tanstack/react-router";
import { DataEntities } from "./characters/data-entities";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isTyping?: boolean;
  isPasswordHidden?: boolean;
  isPasswordVisible?: boolean;
}

export function AuthLayout({
  children,
  title,
  description,
  isTyping = false,
  isPasswordHidden = false,
  isPasswordVisible = false,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 overflow-hidden bg-background">
      {/* Left Branding & Character Section */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary/95 via-primary to-primary/90 p-12 text-primary-foreground border-r border-border/10">
        {/* Abstract Background Noise / Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-105">
              <img src={Logo} alt="Prosper Logo" className="size-32" />
            </div>
            <span className="tracking-tighter uppercase font-bold text-2xl">
              Prosper
            </span>
          </Link>
        </div>

        {/* Character Stage */}
        <div className="relative z-20 flex-1 flex items-center justify-center">
          <DataEntities
            isTyping={isTyping}
            isPasswordHidden={isPasswordHidden}
            isPasswordVisible={isPasswordVisible}
          />
        </div>

        <div className="relative z-20 flex items-center justify-between text-xs font-medium text-primary-foreground/40 uppercase tracking-widest">
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors"
            >
              Terms
            </a>
          </div>
          <span>© 2026 Prosper By Ously</span>
        </div>
      </div>

      {/* Right Form Section */}
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
    </div>
  );
}
