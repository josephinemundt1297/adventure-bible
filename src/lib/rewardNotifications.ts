import type { Achievement } from "./achievements";

export const ACHIEVEMENT_UNLOCKED_EVENT = "adventure-bible:achievement-unlocked";

export function notifyAchievements(achievements: Achievement[]) {
  if (typeof window === "undefined" || achievements.length === 0) return;
  window.dispatchEvent(
    new CustomEvent<Achievement[]>(ACHIEVEMENT_UNLOCKED_EVENT, {
      detail: achievements,
    }),
  );
}
