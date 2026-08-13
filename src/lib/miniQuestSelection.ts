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
): MiniQuestRecommendations {
  if (availableQuests.length === 0) {
    return { primary: null, alternative: null };
  }

  const lowest = [...state.values].sort((a, b) => a.value - b.value)[0];
  if (!lowest) {
    return {
      primary: availableQuests[0],
      alternative: availableQuests[1] ?? null,
    };
  }

  const targetArea = miniToQuestArea[lowest.area];
  const primary = availableQuests.find((quest) => quest.targetArea === targetArea) ?? availableQuests[0];
  const alternative = availableQuests.find(
    (quest) => quest.id !== primary.id && quest.targetArea !== targetArea,
  ) ?? availableQuests.find((quest) => quest.id !== primary.id) ?? null;

  return { primary, alternative };
}
