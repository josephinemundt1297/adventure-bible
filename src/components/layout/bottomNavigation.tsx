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
      className="absolute inset-x-0 bottom-0 z-10 border-t border-base-300 bg-base-100/95 backdrop-blur"
    >
      <ul className="grid grid-cols-4">
        {navigationItems.map((item) => (
          <li key={item.label}>
            {item.path ? (
              <Link
                to={item.path}
                aria-current={item.active ? "page" : undefined}
                className="flex min-h-16 items-center justify-center px-2 py-3 text-sm font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="flex min-h-16 w-full items-center justify-center px-2 py-3 text-sm font-medium"
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
