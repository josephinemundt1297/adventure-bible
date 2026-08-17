import { Show, UserButton, useAuth } from "@clerk/react";
import { Navigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BottomNavigation } from "../components/layout/bottomNavigation";
import { PhoneFrame } from "../components/layout/phoneFrame";
import { RewardNotification } from "../components/ui/rewardNotification";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { isLoaded, isSignedIn } = useAuth();
  const isPlanRoute = pathname === "/plan";
  const isPublicRoute = pathname === "/profile";
  const shouldRedirectToProfile = isLoaded && !isSignedIn && !isPublicRoute;

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-base-100 sm:bg-[#f1e7d6] sm:px-[3vw] sm:py-[2dvh]">
      <PhoneFrame>
        <Show when="signed-in">
          <div className="absolute right-4 top-[1dvh] z-20 rounded-full border border-[#ddceb8] bg-[#fbf5ea]/95 p-1 shadow-sm backdrop-blur">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-9",
                },
              }}
            />
          </div>
        </Show>
        <RewardNotification />
        <main className={`h-full px-4 pb-24 pt-12 ${isPlanRoute ? "min-h-0 overflow-hidden" : "overflow-y-auto"}`}>
          {shouldRedirectToProfile ? (
            <Navigate to="/profile" />
          ) : !isLoaded && !isPublicRoute ? (
            <div className="flex min-h-full items-center justify-center" role="status" aria-live="polite">
              <span className="loading loading-spinner loading-md text-primary" aria-hidden="true" />
              <span className="sr-only">Anmeldung wird geprüft.</span>
            </div>
          ) : (
            children
          )}
        </main>
        <Show when="signed-in">
          <BottomNavigation />
        </Show>
      </PhoneFrame>
    </div>
  );
}
