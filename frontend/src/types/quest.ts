import type { HpArea } from "./hp";

export type QuestType = "main" | "side" | "daily" | "recovery";

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  effort: "short" | "medium";
  rewardXp: number;
  targetArea: HpArea;
}
