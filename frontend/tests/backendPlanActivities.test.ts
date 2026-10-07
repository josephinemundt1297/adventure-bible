import { afterEach, describe, expect, it, vi } from "vitest";
import { apiRequest } from "../src/lib/apiClient";
import { mapBackendPlanActivity } from "../src/lib/backendPlanActivities";

describe("backend plan activities", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("maps backend plan activities to frontend plan activities", () => {
    expect(
      mapBackendPlanActivity({
        id: "plan_activity_123",
        userProfileId: "profile_123",
        questId: null,
        title: "Projektarbeit",
        activityDate: "2026-10-06",
        activityTime: "16:30",
        type: "PERSONAL",
        completed: false,
        sortOrder: 2,
        createdAt: "2026-10-06T12:00:00.000Z",
        updatedAt: "2026-10-06T12:00:00.000Z",
      }),
    ).toEqual({
      id: "plan_activity_123",
      title: "Projektarbeit",
      time: "16:30",
      type: "personal",
      completed: false,
      sortOrder: 2,
    });
  });

  it("accepts no-content API responses", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 204,
      }),
    );

    await expect(
      apiRequest<void>("/api/plan-activities/plan_activity_123", {
        method: "DELETE",
      }),
    ).resolves.toBeUndefined();
  });
});
