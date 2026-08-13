import { INITIAL_PROGRESS, type ProgressState } from "../types/progress";

export const PROGRESS_STATE_KEY = "adventure-bible:progress";

export function readProgress(): ProgressState {
  const stored = sessionStorage.getItem(PROGRESS_STATE_KEY);
  if (!stored) return INITIAL_PROGRESS;

  try {
    const parsed = JSON.parse(stored) as Partial<ProgressState>;
    return {
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      questPoints: typeof parsed.questPoints === "number" ? parsed.questPoints : 0,
      completedQuests: typeof parsed.completedQuests === "number" ? parsed.completedQuests : 0,
    };
  } catch {
    sessionStorage.removeItem(PROGRESS_STATE_KEY);
    return INITIAL_PROGRESS;
  }
}

export function addProgress(rewardXp: number, questPoints = 1): ProgressState {
  const current = readProgress();
  const next: ProgressState = {
    xp: current.xp + rewardXp,
    questPoints: current.questPoints + questPoints,
    completedQuests: current.completedQuests + 1,
  };

  sessionStorage.setItem(PROGRESS_STATE_KEY, JSON.stringify(next));
  return next;
}

export function getLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getLevelProgress(xp: number): number {
  return xp % 100;
}
