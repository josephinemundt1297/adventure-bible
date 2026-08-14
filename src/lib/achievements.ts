import { addXp, readProgress } from "./progress";

export const ACHIEVEMENTS_KEY = "adventure-bible:achievements";
export const HP_CHECK_DATES_KEY = "adventure-bible:hp-check-dates";
export const MINI_HP_CHECK_COUNT_KEY = "adventure-bible:mini-hp-check-count";
export const REFLECTION_COUNT_KEY = "adventure-bible:reflection-count";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-hp-check",
    title: "Erste Schritte",
    description: "Deinen ersten HP-Check abgeschlossen.",
    icon: "🌱",
    xp: 10,
  },
  {
    id: "three-day-hp-check",
    title: "Drei Tage bei dir",
    description: "An drei aufeinanderfolgenden Tagen deinen HP-Zustand überprüft.",
    icon: "🔥",
    xp: 25,
  },
  {
    id: "seven-day-hp-check",
    title: "Eine Woche bei dir",
    description: "An sieben aufeinanderfolgenden Tagen deinen HP-Zustand überprüft.",
    icon: "🌿",
    xp: 75,
  },
  {
    id: "first-quest",
    title: "Queststarter",
    description: "Deine erste Quest abgeschlossen.",
    icon: "⚔️",
    xp: 15,
  },
  {
    id: "ten-quests",
    title: "Abenteurer",
    description: "Zehn Quests abgeschlossen.",
    icon: "🧭",
    xp: 50,
  },
  {
    id: "mini-hp-check",
    title: "Auf dich gehört",
    description: "Einen Mini-HP-Check nach einer Quest durchgeführt.",
    icon: "💚",
    xp: 15,
  },
  {
    id: "three-reflections",
    title: "Abendlicher Rückblick",
    description: "Drei Abendreflexionen gespeichert.",
    icon: "🌙",
    xp: 25,
  },
];

function readUnlocked(): string[] {
  try {
    const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    localStorage.removeItem(ACHIEVEMENTS_KEY);
    return [];
  }
}

function unlock(id: string): Achievement | null {
  const achievement = ACHIEVEMENTS.find((item) => item.id === id);
  if (!achievement) return null;

  const unlocked = readUnlocked();
  if (unlocked.includes(id)) return null;

  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify([...unlocked, id]));
  addXp(achievement.xp);
  return achievement;
}

function saveCount(key: string, count: number) {
  localStorage.setItem(key, String(count));
  return count;
}

function readCount(key: string): number {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) ? value : 0;
}

function getTodayKey(): string {
  return new Date().toLocaleDateString("sv-SE");
}

function readHpDates(): string[] {
  try {
    const stored = localStorage.getItem(HP_CHECK_DATES_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    localStorage.removeItem(HP_CHECK_DATES_KEY);
    return [];
  }
}

function longestCurrentDailyStreak(dates: string[]): number {
  const uniqueDates = [...new Set(dates)].sort();
  if (uniqueDates.length === 0) return 0;

  let streak = 1;
  let longest = 1;
  for (let index = 1; index < uniqueDates.length; index += 1) {
    const previous = new Date(`${uniqueDates[index - 1]}T00:00:00`);
    const current = new Date(`${uniqueDates[index]}T00:00:00`);
    const difference = Math.round((current.getTime() - previous.getTime()) / 86_400_000);
    streak = difference === 1 ? streak + 1 : 1;
    longest = Math.max(longest, streak);
  }
  return longest;
}

export function recordHpCheck(): Achievement[] {
  const dates = [...new Set([...readHpDates(), getTodayKey()])];
  localStorage.setItem(HP_CHECK_DATES_KEY, JSON.stringify(dates));

  const unlocked: Achievement[] = [];
  if (dates.length >= 1) {
    const achievement = unlock("first-hp-check");
    if (achievement) unlocked.push(achievement);
  }

  const streak = longestCurrentDailyStreak(dates);
  if (streak >= 3) {
    const achievement = unlock("three-day-hp-check");
    if (achievement) unlocked.push(achievement);
  }
  if (streak >= 7) {
    const achievement = unlock("seven-day-hp-check");
    if (achievement) unlocked.push(achievement);
  }
  return unlocked;
}

export function recordQuestCompletion(): Achievement[] {
  const completedQuests = readProgress().completedQuests;
  const unlocked: Achievement[] = [];
  if (completedQuests >= 1) {
    const achievement = unlock("first-quest");
    if (achievement) unlocked.push(achievement);
  }
  if (completedQuests >= 10) {
    const achievement = unlock("ten-quests");
    if (achievement) unlocked.push(achievement);
  }
  return unlocked;
}

export function recordMiniHpCheck(): Achievement[] {
  const count = saveCount(MINI_HP_CHECK_COUNT_KEY, readCount(MINI_HP_CHECK_COUNT_KEY) + 1);
  if (count < 1) return [];
  const achievement = unlock("mini-hp-check");
  return achievement ? [achievement] : [];
}

export function recordReflection(): Achievement[] {
  const count = saveCount(REFLECTION_COUNT_KEY, readCount(REFLECTION_COUNT_KEY) + 1);
  if (count < 3) return [];
  const achievement = unlock("three-reflections");
  return achievement ? [achievement] : [];
}

export function getUnlockedAchievements(): Achievement[] {
  const unlocked = new Set(readUnlocked());
  return ACHIEVEMENTS.filter((achievement) => unlocked.has(achievement.id));
}

export function getAchievementCount(): number {
  return readUnlocked().length;
}
