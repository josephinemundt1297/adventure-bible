import { beforeEach, describe, expect, it } from "vitest";
import { getCriticalHpSupport, recordCriticalHpSupport } from "../src/lib/hpSupport";
import type { HpAnswer, HpState } from "../src/types/hp";
import type { Quest } from "../src/types/quest";

const quests: Quest[] = [
  {
    id: "mood-support",
    title: "Kleiner Lichtblick",
    description: "Tu für zehn Minuten etwas, das dir guttut.",
    effort: "short",
    rewardXp: 20,
    targetArea: "mood",
    type: "daily",
  },
];

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

describe("getCriticalHpSupport", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: createStorage(),
    });
  });

  it("returns support for the lowest critical HP check area", () => {
    const state: HpState = {
      overall: 45,
      areas: [
        { area: "energy", score: 75 },
        { area: "focus", score: 50 },
        { area: "mood", score: 25 },
        { area: "body", score: 60 },
      ],
    };
    const answers: HpAnswer[] = [
      { questionId: "mood-1", value: 1 },
      { questionId: "mood-4", value: 2 },
    ];

    const support = getCriticalHpSupport(state, answers, quests);

    expect(support?.area).toBe("mood");
    expect(support?.areaLabel).toBe("Stimmung");
    expect(support?.lowQuestions).toHaveLength(2);
    expect(support?.quest?.id).toBe("mood-support");
  });

  it("uses mental-health oriented tips for mood support", () => {
    const state: HpState = {
      overall: 45,
      areas: [
        { area: "energy", score: 75 },
        { area: "focus", score: 50 },
        { area: "mood", score: 25 },
        { area: "body", score: 60 },
      ],
    };

    const support = getCriticalHpSupport(state, [], quests);

    expect(support?.tips).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Lieblingslied"),
        expect.stringContaining("vertraute Person"),
        expect.stringContaining("warme Dusche"),
      ]),
    );
  });

  it("uses body-oriented tips for body support", () => {
    const state: HpState = {
      overall: 45,
      areas: [
        { area: "energy", score: 75 },
        { area: "focus", score: 50 },
        { area: "mood", score: 60 },
        { area: "body", score: 25 },
      ],
    };

    const support = getCriticalHpSupport(state, [], quests);

    expect(support?.tips).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Wasser ins Gesicht"),
        expect.stringContaining("Dehne"),
        expect.stringContaining("Schlaf"),
      ]),
    );
  });

  it("does not return support when no area is clearly critical", () => {
    const state: HpState = {
      overall: 70,
      areas: [
        { area: "energy", score: 50 },
        { area: "focus", score: 75 },
        { area: "mood", score: 50 },
        { area: "body", score: 60 },
      ],
    };

    expect(getCriticalHpSupport(state, [], quests)).toBeNull();
  });

  it("recommends external support after repeated critical days in two weeks", () => {
    expect(recordCriticalHpSupport("mood", new Date("2026-10-01T10:00:00"))).toBe(false);
    expect(recordCriticalHpSupport("mood", new Date("2026-10-03T10:00:00"))).toBe(false);
    expect(recordCriticalHpSupport("body", new Date("2026-10-07T10:00:00"))).toBe(false);
    expect(recordCriticalHpSupport("focus", new Date("2026-10-12T10:00:00"))).toBe(true);
  });
});
