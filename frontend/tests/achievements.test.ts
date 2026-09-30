import { beforeEach, describe, expect, it } from "vitest";
import {
  ACHIEVEMENTS_KEY,
  CAMPFIRE_COUNT_KEY,
  recordCampfire,
  recordQuestCompletion,
  getUnlockedAchievements,
} from "../src/lib/achievements";
import { PROGRESS_STATE_KEY } from "../src/lib/progress";

function createStorage() {
  let store = new Map<string, string>();

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => {
      store = new Map<string, string>();
    },
    key: (index: number) => [...store.keys()][index] ?? null,
    get length() {
      return store.size;
    },
  } satisfies Storage;
}

beforeEach(() => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: createStorage(),
  });
  Object.defineProperty(globalThis, "sessionStorage", {
    configurable: true,
    value: createStorage(),
  });
});

describe("achievements", () => {
  it("unlocks first and five-quest milestones", () => {
    sessionStorage.setItem(PROGRESS_STATE_KEY, JSON.stringify({ xp: 100, questPoints: 5, completedQuests: 5 }));

    const unlocked = recordQuestCompletion();

    expect(unlocked.map((achievement) => achievement.id)).toEqual(["first-quest", "five-quests"]);
    expect(getUnlockedAchievements().map((achievement) => achievement.id)).toContain("five-quests");
  });

  it("unlocks campfire milestones at one and three uses", () => {
    expect(recordCampfire().map((achievement) => achievement.id)).toEqual(["first-campfire"]);
    expect(localStorage.getItem(CAMPFIRE_COUNT_KEY)).toBe("1");

    recordCampfire();
    const third = recordCampfire();

    expect(third.map((achievement) => achievement.id)).toEqual(["three-campfires"]);
    expect(localStorage.getItem(ACHIEVEMENTS_KEY)).toContain("three-campfires");
  });
});
