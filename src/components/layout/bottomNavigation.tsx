import { Link } from "@tanstack/react-router";

const navigationItems = [
  { label: "Home", path: "/", active: true },
  { label: "Quests", path: null, active: false },
  { label: "Plan", path: null, active: false },
  { label: "Ich", path: null, active: false },
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
                aria-current={item.active ? "page" : undefined}
                className="flex min-h-12 items-center justify-center rounded-xl px-2 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {item.label}
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="flex min-h-12 w-full items-center justify-center rounded-xl px-2 py-2 text-sm font-medium"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
