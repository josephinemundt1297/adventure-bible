import type { Quest } from "./quest";

export type QuestStatus = "available" | "active" | "completed";

export interface QuestProgress {
  quest: Quest;
  status: QuestStatus;
  completedAt?: string;
  rewardXp?: number;
  rewardQuestPoints?: number;
}
