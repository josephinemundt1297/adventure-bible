import { describe, expect, it } from "vitest";
import { getCriticalHpSupport } from "../src/lib/hpSupport";
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

describe("getCriticalHpSupport", () => {
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
});
