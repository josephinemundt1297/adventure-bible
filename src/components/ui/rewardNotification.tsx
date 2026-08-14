import { useEffect, useState } from "react";
import type { Achievement } from "../../lib/achievements";
import { ACHIEVEMENT_UNLOCKED_EVENT } from "../../lib/rewardNotifications";

export function RewardNotification() {
  const [queue, setQueue] = useState<Achievement[]>([]);
  const current = queue[0] ?? null;

  useEffect(() => {
    function handleUnlock(event: Event) {
      const achievements = (event as CustomEvent<Achievement[]>).detail;
      if (!achievements?.length) return;
      setQueue((items) => [...items, ...achievements]);
    }

    window.addEventListener(ACHIEVEMENT_UNLOCKED_EVENT, handleUnlock);
    return () => window.removeEventListener(ACHIEVEMENT_UNLOCKED_EVENT, handleUnlock);
  }, []);

  useEffect(() => {
    if (!current) return;
    const timeout = window.setTimeout(() => {
      setQueue((items) => items.slice(1));
    }, 5000);
    return () => window.clearTimeout(timeout);
  }, [current]);

  if (!current) return null;

  return (
    <div className="pointer-events-none absolute inset-x-3 top-3 z-50 flex justify-center" role="status" aria-live="polite">
      <div className="w-full max-w-sm rounded-2xl border border-primary/30 bg-base-100 px-4 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl" aria-hidden="true">
            {current.icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">Achievement freigeschaltet</p>
            <p className="mt-0.5 truncate font-bold">{current.title}</p>
            <p className="text-xs leading-4 text-base-content/65">{current.description}</p>
          </div>
          <span className="shrink-0 text-sm font-extrabold text-primary">+{current.xp} XP</span>
        </div>
      </div>
    </div>
  );
}
