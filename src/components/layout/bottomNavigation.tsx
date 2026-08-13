import { Link } from "@tanstack/react-router";

const navigationItems = [
  { label: "Home", path: "/", icon: "⌂" },
  { label: "Quests", path: null, icon: "♡" },
  { label: "Plan", path: null, icon: "▣" },
  { label: "Ich", path: "/profile", icon: "♙" },
] as const;

export function BottomNavigation() {
  return (
    <nav
      aria-label="Hauptnavigation"
      className="absolute inset-x-4 bottom-4 z-10 rounded-2xl border border-base-300 bg-base-100/95 p-2 shadow-lg backdrop-blur"
    >
      <ul className="grid grid-cols-4 gap-1">
        {navigationItems.map((item) => (
          <li key={item.label}>
            {item.path ? (
              <Link
                to={item.path}
                activeProps={{
                  "aria-current": "page",
                  className: "bg-primary/10 text-primary",
                }}
                className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-xs font-medium text-base-content/70 transition-colors hover:bg-base-200 hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="flex min-h-12 w-full flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-xs font-medium text-base-content/70 disabled:cursor-default disabled:opacity-100"
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
