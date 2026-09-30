import type { MiniHpArea, MiniHpState } from "../types/miniHp";
import type { Quest } from "../types/quest";

const miniToQuestArea: Record<MiniHpArea, Quest["targetArea"]> = {
  energy: "energy",
  focus: "focus",
  mood: "mood",
  body: "body",
};

export interface MiniQuestRecommendations {
  primary: Quest | null;
  alternative: Quest | null;
}

export function selectMiniQuest(
  state: MiniHpState,
  availableQuests: Quest[],
  excludedQuestIds: string[] = [],
): MiniQuestRecommendations {
  if (availableQuests.length === 0) {
    return { primary: null, alternative: null };
  }

  const eligible = availableQuests.filter((quest) => !excludedQuestIds.includes(quest.id));
  const pool = eligible.length >= 2 ? eligible : availableQuests;

  const hpByArea = new Map(
    state.values.map((value) => [miniToQuestArea[value.area], value.value]),
  );

  // Sort every quest by the HP value of the area it supports.
  // Lower HP = greater need = higher recommendation priority.
  const sorted = [...pool].sort((a, b) => {
    const aScore = hpByArea.get(a.targetArea) ?? 100;
    const bScore = hpByArea.get(b.targetArea) ?? 100;
    return aScore - bScore;
  });

  return {
    primary: sorted[0] ?? null,
    alternative: sorted[1] ?? null,
  };
}
