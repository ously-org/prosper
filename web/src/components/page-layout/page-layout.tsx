import React from "react";
import { Header } from "../shared/header";
import { SystemAlertsFooter } from "../shared/system-alerts-footer";

interface FinancePageLayoutProps {
  title: string;
  description?: string;
  headerChildren?: React.ReactNode;
  children: React.ReactNode;
}

export function FinancePageLayout({
  title,
  description,
  headerChildren,
  children,
}: FinancePageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} description={description}>
        {headerChildren}
      </Header>
      <main className="flex-1 overflow-auto">{children}</main>
      <SystemAlertsFooter />
    </div>
  );
}
