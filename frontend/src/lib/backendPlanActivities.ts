import type { PlannedActivity } from "../types/plan";
import { apiRequest } from "./apiClient";

type BackendPlanActivityType = "PERSONAL" | "QUEST";

export interface BackendPlanActivity {
  id: string;
  userProfileId: string;
  questId: string | null;
  title: string;
  activityDate: string;
  activityTime: string;
  type: BackendPlanActivityType;
  completed: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface BackendPlanActivityInput {
  activity: PlannedActivity;
  activityDate: string;
  getToken?: () => Promise<string | null>;
}

function toBackendType(type: PlannedActivity["type"]): BackendPlanActivityType {
  return type === "quest" ? "QUEST" : "PERSONAL";
}

function toFrontendType(type: BackendPlanActivityType): PlannedActivity["type"] {
  return type === "QUEST" ? "quest" : "personal";
}

export function mapBackendPlanActivity(
  activity: BackendPlanActivity,
): PlannedActivity {
  return {
    id: activity.id,
    title: activity.title,
    time: activity.activityTime,
    type: toFrontendType(activity.type),
    completed: activity.completed,
    sortOrder: activity.sortOrder,
  };
}

export async function listBackendPlanActivities(input: {
  activityDate: string;
  getToken?: () => Promise<string | null>;
}) {
  const params = new URLSearchParams({
    activityDate: input.activityDate,
  });

  return apiRequest<{ data: BackendPlanActivity[]; meta: { count: number } }>(
    `/api/plan-activities?${params.toString()}`,
    {
      getToken: input.getToken,
    },
  );
}

export async function createBackendPlanActivity({
  activity,
  activityDate,
  getToken,
}: BackendPlanActivityInput) {
  return apiRequest<{ data: BackendPlanActivity }>("/api/plan-activities", {
    getToken,
    method: "POST",
    body: {
      title: activity.title,
      activityDate,
      activityTime: activity.time,
      type: toBackendType(activity.type),
      completed: activity.completed,
      sortOrder: activity.sortOrder ?? 0,
    },
  });
}

export async function updateBackendPlanActivity(input: {
  activityId: string;
  getToken?: () => Promise<string | null>;
  patch: Partial<Pick<PlannedActivity, "completed" | "sortOrder" | "time" | "title" | "type">>;
}) {
  return apiRequest<{ data: BackendPlanActivity }>(
    `/api/plan-activities/${input.activityId}`,
    {
      getToken: input.getToken,
      method: "PATCH",
      body: {
        completed: input.patch.completed,
        sortOrder: input.patch.sortOrder,
        title: input.patch.title,
        activityTime: input.patch.time,
        type: input.patch.type ? toBackendType(input.patch.type) : undefined,
      },
    },
  );
}

export async function deleteBackendPlanActivity(input: {
  activityId: string;
  getToken?: () => Promise<string | null>;
}) {
  return apiRequest<void>(`/api/plan-activities/${input.activityId}`, {
    getToken: input.getToken,
    method: "DELETE",
  });
}
