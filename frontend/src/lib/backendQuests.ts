import type { Quest, QuestType } from "../types/quest";
import { apiRequest } from "./apiClient";

type BackendQuestType = "MAIN" | "SIDE" | "DAILY" | "RECOVERY";

export interface BackendQuest {
  id: string;
  userProfileId: string;
  title: string;
  description: string | null;
  type: BackendQuestType;
  difficulty: number;
  estimatedMinutes: number | null;
  xpReward: number;
  questPointReward: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

function toBackendQuestType(type: QuestType): BackendQuestType {
  return type.toUpperCase() as BackendQuestType;
}

function estimatedMinutesForQuest(quest: Quest): number {
  return quest.effort === "short" ? 5 : 20;
}

function difficultyForQuest(quest: Quest): number {
  return quest.effort === "short" ? 1 : 2;
}

function matchesFrontendQuest(backendQuest: BackendQuest, frontendQuest: Quest) {
  return (
    backendQuest.title === frontendQuest.title &&
    backendQuest.description === frontendQuest.description &&
    backendQuest.type === toBackendQuestType(frontendQuest.type) &&
    backendQuest.xpReward === frontendQuest.rewardXp
  );
}

export async function listBackendQuests(input: {
  getToken?: () => Promise<string | null>;
}) {
  return apiRequest<{ data: BackendQuest[]; meta: { count: number } }>("/api/quests", {
    getToken: input.getToken,
  });
}

export async function createBackendQuest(input: {
  getToken?: () => Promise<string | null>;
  quest: Quest;
}) {
  return apiRequest<{ data: BackendQuest }>("/api/quests", {
    getToken: input.getToken,
    method: "POST",
    body: {
      title: input.quest.title,
      description: input.quest.description,
      type: toBackendQuestType(input.quest.type),
      difficulty: difficultyForQuest(input.quest),
      estimatedMinutes: estimatedMinutesForQuest(input.quest),
      xpReward: input.quest.rewardXp,
      questPointReward: 1,
    },
  });
}

export async function ensureBackendQuest(input: {
  getToken?: () => Promise<string | null>;
  quest: Quest;
}) {
  const existingQuests = await listBackendQuests({ getToken: input.getToken });
  const existingQuest = existingQuests.data.find((backendQuest) =>
    matchesFrontendQuest(backendQuest, input.quest),
  );

  if (existingQuest) {
    return existingQuest;
  }

  const createdQuest = await createBackendQuest(input);
  return createdQuest.data;
}
