import type { Quest } from "../types/quest";
import { apiRequest } from "./apiClient";
import { ensureBackendQuest } from "./backendQuests";

type BackendQuestLogStatus = "STARTED" | "COMPLETED" | "POSTPONED" | "SKIPPED";

export interface BackendQuestLog {
  id: string;
  userProfileId: string;
  questId: string;
  status: BackendQuestLogStatus;
  startedAt: string | null;
  completedAt: string | null;
  scorePoints: number | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function startBackendQuestLog(input: {
  getToken?: () => Promise<string | null>;
  quest: Quest;
}) {
  const backendQuest = await ensureBackendQuest(input);
  const questLog = await apiRequest<{ data: BackendQuestLog }>("/api/quest-logs", {
    getToken: input.getToken,
    method: "POST",
    body: {
      questId: backendQuest.id,
      status: "STARTED",
    },
  });

  return {
    quest: backendQuest,
    questLog: questLog.data,
  };
}

export async function completeBackendQuestLog(input: {
  backendQuestLogId?: string;
  getToken?: () => Promise<string | null>;
  quest: Quest;
}) {
  if (input.backendQuestLogId) {
    const questLog = await apiRequest<{ data: BackendQuestLog }>(
      `/api/quest-logs/${input.backendQuestLogId}`,
      {
        getToken: input.getToken,
        method: "PATCH",
        body: {
          status: "COMPLETED",
        },
      },
    );

    return questLog.data;
  }

  const backendQuest = await ensureBackendQuest(input);
  const questLog = await apiRequest<{ data: BackendQuestLog }>("/api/quest-logs", {
    getToken: input.getToken,
    method: "POST",
    body: {
      questId: backendQuest.id,
      status: "COMPLETED",
    },
  });

  return questLog.data;
}
