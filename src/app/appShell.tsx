import type { ReactNode } from "react";
import { BottomNavigation } from "../components/layout/bottomNavigation";
import { PhoneFrame } from "../components/layout/phoneFrame";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <PhoneFrame>
        <main className="h-full overflow-y-auto px-4 pb-24 pt-6">
          {children}
        </main>
        <BottomNavigation />
      </PhoneFrame>
    </div>
  );
}
