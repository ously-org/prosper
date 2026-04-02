import React from "react";

interface HeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function Header({ title, description, children }: HeaderProps) {
  return (
    <header className="mb-8 flex justify-between items-end">
      <div>
        <h2 className="text-heading font-extrabold text-2xl tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-4">
        {children}
      </div>
    </header>
  );
}
