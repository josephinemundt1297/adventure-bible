import { describe, expect, it } from "vitest";
import { selectMiniQuest } from "../src/lib/miniQuestSelection";
import type { MiniHpState } from "../src/types/miniHp";
import type { Quest } from "../src/types/quest";

const quests: Quest[] = [
  {
    id: "energy-quest",
    title: "Energie",
    description: "Eine Energieaufgabe",
    type: "daily",
    effort: "short",
    rewardXp: 10,
    targetArea: "energy",
  },
  {
    id: "focus-quest",
    title: "Fokus",
    description: "Eine Fokusaufgabe",
    type: "daily",
    effort: "short",
    rewardXp: 15,
    targetArea: "focus",
  },
  {
    id: "body-quest",
    title: "Körper",
    description: "Eine Körperaufgabe",
    type: "recovery",
    effort: "short",
    rewardXp: 20,
    targetArea: "body",
  },
];

const state: MiniHpState = {
  values: [
    { area: "energy", value: 80 },
    { area: "focus", value: 20 },
    { area: "mood", value: 60 },
    { area: "body", value: 70 },
  ],
  completedAt: "2026-08-13T00:00:00.000Z",
};

describe("selectMiniQuest", () => {
  it("uses the lowest mini HP area for the primary recommendation", () => {
    const result = selectMiniQuest(state, quests);

    expect(result.primary?.id).toBe("focus-quest");
    expect(result.alternative?.id).toBe("energy-quest");
  });

  it("returns null recommendations when no quests are available", () => {
    expect(selectMiniQuest(state, [])).toEqual({ primary: null, alternative: null });
  });
});
