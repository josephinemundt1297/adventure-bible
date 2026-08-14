import { describe, expect, it } from "vitest";
import { selectQuest } from "../src/lib/questSelection";
import type { HpState } from "../src/types/hp";
import type { Quest } from "../src/types/quest";

const quests: Quest[] = [
  {
    id: "focus-quest",
    title: "Fokus",
    description: "Eine Fokusaufgabe",
    type: "daily",
    effort: "short",
    rewardXp: 10,
    targetArea: "focus",
  },
  {
    id: "energy-quest",
    title: "Energie",
    description: "Eine Energieaufgabe",
    type: "daily",
    effort: "short",
    rewardXp: 10,
    targetArea: "energy",
  },
];

const state: HpState = {
  areas: [
    { area: "body", score: 80 },
    { area: "energy", score: 60 },
    { area: "focus", score: 20 },
  ],
  overall: 53,
};

describe("selectQuest", () => {
  it("selects a quest matching the lowest HP area", () => {
    expect(selectQuest(state, quests)?.id).toBe("focus-quest");
  });

  it("skips excluded quests when another quest is available", () => {
    expect(selectQuest(state, quests, ["focus-quest"])?.id).toBe("energy-quest");
  });

  it("falls back to the full pool when every quest is excluded", () => {
    expect(selectQuest(state, quests, ["focus-quest", "energy-quest"])?.id).toBe("focus-quest");
  });

  it("returns null when there are no quests", () => {
    expect(selectQuest(state, [])).toBeNull();
  });
});
