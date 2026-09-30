import type { HpState } from "../types/hp";
import type { Quest } from "../types/quest";

export function selectQuest(
  state: HpState,
  availableQuests: Quest[],
  excludedQuestIds: string[] = [],
): Quest | null {
  if (availableQuests.length === 0) return null;

  const eligible = availableQuests.filter((quest) => !excludedQuestIds.includes(quest.id));
  const pool = eligible.length > 0 ? eligible : availableQuests;
  const lowestArea = [...state.areas].sort((a, b) => a.score - b.score)[0];
  if (!lowestArea) return pool[0];

  const matching = pool.filter((quest) => quest.targetArea === lowestArea.area);
  return matching[0] ?? pool[0];
}
