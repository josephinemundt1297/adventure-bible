import { Link } from "@tanstack/react-router";

const navigationItems = [
  { label: "Home", path: "/", icon: "⌂" },
  { label: "Quests", path: "/quests", icon: "♡" },
  { label: "Plan", path: "/plan", icon: "▣" },
  { label: "Ich", path: "/profile", icon: "♙" },
] as const;

const activeNavigationClass = "bg-primary/12 text-primary";

export function BottomNavigation() {
  return (
    <nav
      aria-label="Hauptnavigation"
      className="app-floating-surface absolute bottom-4 left-4 right-4 z-10 rounded-2xl border p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
    >
      <ul className="flex min-w-0 items-end gap-1">
        {navigationItems.slice(0, 2).map((item) => (
          <li key={item.label} className="min-w-0 flex-1">
            <Link
              to={item.path}
              activeProps={{
                "aria-current": "page",
                className: activeNavigationClass,
              }}
              className="flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1 text-xs font-medium text-base-content/65 transition-colors hover:bg-base-200 hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}

        <li className="relative -mt-7 flex w-16 shrink-0 justify-center">
          <Link
            to="/hp-check"
            aria-label="Großen HP-Check starten"
            activeProps={{
              "aria-current": "page",
            }}
            className="app-hp-navigation-button flex size-16 flex-col items-center justify-center rounded-full border-4 bg-primary text-primary-content shadow-xl outline-offset-2 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ♥
            </span>
            <span className="mt-0.5 text-xs font-bold leading-none">HP</span>
          </Link>
        </li>

        {navigationItems.slice(2).map((item) => (
          <li key={item.label} className="min-w-0 flex-1">
            <Link
              to={item.path}
              activeProps={{
                "aria-current": "page",
                className: activeNavigationClass,
              }}
              className="flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1 text-xs font-medium text-base-content/65 transition-colors hover:bg-base-200 hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
