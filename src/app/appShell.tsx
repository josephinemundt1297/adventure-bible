import type { ReactNode } from "react";
import { BottomNavigation } from "../components/layout/bottomNavigation";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <main className="min-h-screen pb-20">{children}</main>
      <BottomNavigation />
    </div>
  );
}
