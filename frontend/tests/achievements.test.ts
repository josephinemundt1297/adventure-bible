import { beforeEach, describe, expect, it } from "vitest";
import {
  ACHIEVEMENTS_KEY,
  CAMPFIRE_COUNT_KEY,
  recordCampfire,
  recordMiniHpCheck,
  recordQuestCompletion,
  recordReflection,
  getUnlockedAchievementDetails,
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
    expect(getUnlockedAchievementDetails().find((achievement) => achievement.id === "five-quests")?.unlockedAt).toEqual(expect.any(String));
  });

  it("unlocks campfire milestones at one and three uses", () => {
    expect(recordCampfire().map((achievement) => achievement.id)).toEqual(["first-campfire"]);
    expect(localStorage.getItem(CAMPFIRE_COUNT_KEY)).toBe("1");

    recordCampfire();
    const third = recordCampfire();

    expect(third.map((achievement) => achievement.id)).toEqual(["three-campfires"]);
    expect(JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) ?? "[]")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "three-campfires", unlockedAt: expect.any(String) }),
      ]),
    );
  });

  it("unlocks higher quest milestones without duplicating older rewards", () => {
    sessionStorage.setItem(PROGRESS_STATE_KEY, JSON.stringify({ xp: 0, questPoints: 50, completedQuests: 50 }));

    expect(recordQuestCompletion().map((achievement) => achievement.id)).toEqual([
      "first-quest",
      "five-quests",
      "ten-quests",
      "twenty-five-quests",
      "fifty-quests",
    ]);
    expect(recordQuestCompletion()).toEqual([]);
  });

  it("unlocks mini-check and reflection milestone tiers", () => {
    for (let index = 0; index < 4; index += 1) {
      recordMiniHpCheck();
    }

    expect(recordMiniHpCheck().map((achievement) => achievement.id)).toEqual(["five-mini-hp-checks"]);

    for (let index = 0; index < 6; index += 1) {
      recordReflection();
    }

    expect(recordReflection().map((achievement) => achievement.id)).toEqual(["seven-reflections"]);
  });

  it("keeps legacy achievement unlocks readable", () => {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(["first-campfire"]));

    expect(getUnlockedAchievementDetails()).toEqual([
      expect.objectContaining({
        id: "first-campfire",
        unlockedAt: "Bereits freigeschaltet",
      }),
    ]);
  });
});
