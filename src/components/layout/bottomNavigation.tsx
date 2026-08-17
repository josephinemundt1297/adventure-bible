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
      className="absolute bottom-4 left-1/2 z-10 w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl border border-[#ddceb8] bg-[#fbf5ea]/96 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur"
    >
      <ul className="grid grid-cols-5 items-end gap-1">
        {navigationItems.slice(0, 2).map((item) => (
          <li key={item.label}>
            <Link
              to={item.path}
              activeProps={{
                "aria-current": "page",
                className: activeNavigationClass,
              }}
              className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-xs font-medium text-base-content/65 transition-colors hover:bg-base-200 hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}

        <li className="relative -mt-7 flex justify-center">
          <Link
            to="/hp-check"
            aria-label="Großen HP-Check starten"
            activeProps={{
              "aria-current": "page",
            }}
            className="flex size-16 flex-col items-center justify-center rounded-full border-4 border-[#fbf5ea] bg-primary text-primary-content shadow-xl outline-offset-2 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ♥
            </span>
            <span className="mt-0.5 text-[0.65rem] font-bold leading-none">HP</span>
          </Link>
        </li>

        {navigationItems.slice(2).map((item) => (
          <li key={item.label}>
            <Link
              to={item.path}
              activeProps={{
                "aria-current": "page",
                className: activeNavigationClass,
              }}
              className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-xs font-medium text-base-content/65 transition-colors hover:bg-base-200 hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
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
