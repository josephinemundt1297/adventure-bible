import { addXp, readProgress } from "./progress";

export const ACHIEVEMENTS_KEY = "adventure-bible:achievements";
export const HP_CHECK_DATES_KEY = "adventure-bible:hp-check-dates";
export const MINI_HP_CHECK_COUNT_KEY = "adventure-bible:mini-hp-check-count";
export const CAMPFIRE_COUNT_KEY = "adventure-bible:campfire-count";
export const REFLECTION_COUNT_KEY = "adventure-bible:reflection-count";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  category: "checks" | "quests" | "recovery" | "reflection";
}

export interface UnlockedAchievement extends Achievement {
  unlockedAt: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-hp-check",
    title: "Erste Schritte",
    description: "Deinen ersten HP-Check abgeschlossen.",
    icon: "🌱",
    xp: 10,
    category: "checks",
  },
  {
    id: "three-day-hp-check",
    title: "Drei Tage bei dir",
    description: "An drei aufeinanderfolgenden Tagen deinen HP-Zustand überprüft.",
    icon: "🔥",
    xp: 25,
    category: "checks",
  },
  {
    id: "seven-day-hp-check",
    title: "Eine Woche bei dir",
    description: "An sieben aufeinanderfolgenden Tagen deinen HP-Zustand überprüft.",
    icon: "🌿",
    xp: 75,
    category: "checks",
  },
  {
    id: "fourteen-day-hp-check",
    title: "Zwei Wochen Achtsamkeit",
    description: "An vierzehn aufeinanderfolgenden Tagen deinen HP-Zustand überprüft.",
    icon: "🪷",
    xp: 100,
    category: "checks",
  },
  {
    id: "thirty-day-hp-check",
    title: "Monatswächter",
    description: "An dreißig aufeinanderfolgenden Tagen deinen HP-Zustand überprüft.",
    icon: "🏆",
    xp: 150,
    category: "checks",
  },
  {
    id: "first-quest",
    title: "Queststarter",
    description: "Deine erste Quest abgeschlossen.",
    icon: "⚔️",
    xp: 15,
    category: "quests",
  },
  {
    id: "five-quests",
    title: "Questjäger",
    description: "Fünf Quests abgeschlossen.",
    icon: "🗡️",
    xp: 30,
    category: "quests",
  },
  {
    id: "ten-quests",
    title: "Abenteurer",
    description: "Zehn Quests abgeschlossen.",
    icon: "🧭",
    xp: 50,
    category: "quests",
  },
  {
    id: "twenty-five-quests",
    title: "Quest-Routine",
    description: "Fünfundzwanzig Quests abgeschlossen.",
    icon: "📜",
    xp: 90,
    category: "quests",
  },
  {
    id: "fifty-quests",
    title: "Legendenpfad",
    description: "Fünfzig Quests abgeschlossen.",
    icon: "👑",
    xp: 150,
    category: "quests",
  },
  {
    id: "mini-hp-check",
    title: "Auf dich gehört",
    description: "Einen Mini-HP-Check nach einer Quest durchgeführt.",
    icon: "💚",
    xp: 15,
    category: "checks",
  },
  {
    id: "five-mini-hp-checks",
    title: "Feinjustiert",
    description: "Fünf Mini-HP-Checks nach Quests durchgeführt.",
    icon: "🧩",
    xp: 45,
    category: "checks",
  },
  {
    id: "ten-mini-hp-checks",
    title: "Innerer Kompass",
    description: "Zehn Mini-HP-Checks nach Quests durchgeführt.",
    icon: "🧿",
    xp: 75,
    category: "checks",
  },
  {
    id: "first-campfire",
    title: "Rast gemacht",
    description: "Zum ersten Mal bewusst am Lagerfeuer gerastet.",
    icon: "🔥",
    xp: 15,
    category: "recovery",
  },
  {
    id: "three-campfires",
    title: "Meister der Rast",
    description: "Dreimal bewusst eine Pause am Lagerfeuer gewählt.",
    icon: "🏕️",
    xp: 35,
    category: "recovery",
  },
  {
    id: "seven-campfires",
    title: "Ruhiger Rhythmus",
    description: "Siebenmal bewusst eine Pause am Lagerfeuer gewählt.",
    icon: "🌌",
    xp: 70,
    category: "recovery",
  },
  {
    id: "fourteen-campfires",
    title: "Hüter der Regeneration",
    description: "Vierzehnmal bewusst eine Pause am Lagerfeuer gewählt.",
    icon: "🛡️",
    xp: 110,
    category: "recovery",
  },
  {
    id: "three-reflections",
    title: "Abendlicher Rückblick",
    description: "Drei Abendreflexionen gespeichert.",
    icon: "🌙",
    xp: 25,
    category: "reflection",
  },
  {
    id: "seven-reflections",
    title: "Wochenspiegel",
    description: "Sieben Abendreflexionen gespeichert.",
    icon: "🔎",
    xp: 60,
    category: "reflection",
  },
  {
    id: "fourteen-reflections",
    title: "Tiefer Blick",
    description: "Vierzehn Abendreflexionen gespeichert.",
    icon: "📖",
    xp: 100,
    category: "reflection",
  },
];

interface AchievementUnlockRecord {
  id: string;
  unlockedAt: string;
}

function readUnlockedRecords(): AchievementUnlockRecord[] {
  try {
    const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as Array<string | AchievementUnlockRecord>;
    return parsed
      .map((item) => {
        if (typeof item === "string") {
          return { id: item, unlockedAt: "Bereits freigeschaltet" };
        }
        return item;
      })
      .filter((item) => typeof item.id === "string" && typeof item.unlockedAt === "string");
  } catch {
    localStorage.removeItem(ACHIEVEMENTS_KEY);
    return [];
  }
}

function readUnlocked(): string[] {
  return readUnlockedRecords().map((record) => record.id);
}

function unlock(id: string): Achievement | null {
  const achievement = ACHIEVEMENTS.find((item) => item.id === id);
  if (!achievement) return null;

  const unlocked = readUnlocked();
  if (unlocked.includes(id)) return null;

  localStorage.setItem(
    ACHIEVEMENTS_KEY,
    JSON.stringify([...readUnlockedRecords(), { id, unlockedAt: new Date().toISOString() }]),
  );
  addXp(achievement.xp);
  return achievement;
}

function unlockMilestones(milestones: Array<[boolean, string]>): Achievement[] {
  return milestones.flatMap(([condition, id]) => {
    if (!condition) return [];
    const achievement = unlock(id);
    return achievement ? [achievement] : [];
  });
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

  const streak = longestCurrentDailyStreak(dates);
  return unlockMilestones([
    [dates.length >= 1, "first-hp-check"],
    [streak >= 3, "three-day-hp-check"],
    [streak >= 7, "seven-day-hp-check"],
    [streak >= 14, "fourteen-day-hp-check"],
    [streak >= 30, "thirty-day-hp-check"],
  ]);
}

export function recordQuestCompletion(): Achievement[] {
  const completedQuests = readProgress().completedQuests;
  return unlockMilestones([
    [completedQuests >= 1, "first-quest"],
    [completedQuests >= 5, "five-quests"],
    [completedQuests >= 10, "ten-quests"],
    [completedQuests >= 25, "twenty-five-quests"],
    [completedQuests >= 50, "fifty-quests"],
  ]);
}

export function recordMiniHpCheck(): Achievement[] {
  const count = saveCount(MINI_HP_CHECK_COUNT_KEY, readCount(MINI_HP_CHECK_COUNT_KEY) + 1);
  return unlockMilestones([
    [count >= 1, "mini-hp-check"],
    [count >= 5, "five-mini-hp-checks"],
    [count >= 10, "ten-mini-hp-checks"],
  ]);
}

export function recordCampfire(): Achievement[] {
  const count = saveCount(CAMPFIRE_COUNT_KEY, readCount(CAMPFIRE_COUNT_KEY) + 1);
  return unlockMilestones([
    [count >= 1, "first-campfire"],
    [count >= 3, "three-campfires"],
    [count >= 7, "seven-campfires"],
    [count >= 14, "fourteen-campfires"],
  ]);
}

export function recordReflection(): Achievement[] {
  const count = saveCount(REFLECTION_COUNT_KEY, readCount(REFLECTION_COUNT_KEY) + 1);
  return unlockMilestones([
    [count >= 3, "three-reflections"],
    [count >= 7, "seven-reflections"],
    [count >= 14, "fourteen-reflections"],
  ]);
}

export function getUnlockedAchievements(): Achievement[] {
  const unlocked = new Set(readUnlocked());
  return ACHIEVEMENTS.filter((achievement) => unlocked.has(achievement.id));
}

export function getUnlockedAchievementDetails(): UnlockedAchievement[] {
  const records = new Map(readUnlockedRecords().map((record) => [record.id, record.unlockedAt]));
  return ACHIEVEMENTS
    .filter((achievement) => records.has(achievement.id))
    .map((achievement) => ({
      ...achievement,
      unlockedAt: records.get(achievement.id) ?? "Bereits freigeschaltet",
    }));
}

export function getAchievementCount(): number {
  return readUnlocked().length;
}
