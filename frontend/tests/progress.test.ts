import { beforeEach, describe, expect, it } from "vitest";
import { addProgress, getLevel, getLevelProgress, readProgress, PROGRESS_STATE_KEY } from "../src/lib/progress";

function createSessionStorage() {
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
  Object.defineProperty(globalThis, "sessionStorage", {
    configurable: true,
    value: createSessionStorage(),
  });
});

describe("progress", () => {
  it("starts with empty progress", () => {
    expect(readProgress()).toEqual({ xp: 0, questPoints: 0, completedQuests: 0 });
  });

  it("adds XP and quest progress", () => {
    expect(addProgress(25)).toEqual({ xp: 25, questPoints: 1, completedQuests: 1 });
    expect(addProgress(75, 2)).toEqual({ xp: 100, questPoints: 3, completedQuests: 2 });
  });

  it("calculates level and progress within the current level", () => {
    expect(getLevel(0)).toBe(1);
    expect(getLevel(100)).toBe(2);
    expect(getLevel(250)).toBe(3);
    expect(getLevelProgress(250)).toBe(50);
  });

  it("recovers from invalid stored progress", () => {
    sessionStorage.setItem(PROGRESS_STATE_KEY, "not-json");

    expect(readProgress()).toEqual({ xp: 0, questPoints: 0, completedQuests: 0 });
  });
});
