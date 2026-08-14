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
  const pool = eligible.length > 0 ? eligible : availableQuests;
  const lowest = [...state.values].sort((a, b) => a.value - b.value)[0];

  if (!lowest) {
    return {
      primary: pool[0],
      alternative: pool[1] ?? null,
    };
  }

  const targetArea = miniToQuestArea[lowest.area];
  const primary = pool.find((quest) => quest.targetArea === targetArea) ?? pool[0];
  const alternative = pool.find(
    (quest) => quest.id !== primary.id && quest.targetArea !== targetArea,
  ) ?? pool.find((quest) => quest.id !== primary.id) ?? null;

  return { primary, alternative };
}
