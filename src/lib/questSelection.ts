import type { HpState } from "../types/hp";
import type { Quest } from "../types/quest";

export function selectQuest(state: HpState, availableQuests: Quest[]): Quest | null {
  if (availableQuests.length === 0) return null;

  const lowestArea = [...state.areas].sort((a, b) => a.score - b.score)[0];
  if (!lowestArea) return availableQuests[0];

  const matching = availableQuests.filter((quest) => quest.targetArea === lowestArea.area);
  return matching[0] ?? availableQuests[0];
}
