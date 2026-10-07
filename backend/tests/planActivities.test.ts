import type { Server } from "node:http";
import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import type {
  PlanActivityRecord,
  PlanActivityService,
} from "../src/services/planActivityService.js";

const createdAt = new Date("2026-10-06T13:15:00.000Z");
const updatedAt = new Date("2026-10-06T13:20:00.000Z");
const activityDate = new Date("2026-10-06T00:00:00.000Z");

const validPlanActivityInput = {
  title: "20 Min. lernen",
  activityDate: "2026-10-06",
  activityTime: "10:00",
  type: "QUEST",
  questId: "quest_123",
} as const;

function createPlanActivity(
  overrides: Partial<PlanActivityRecord> = {},
): PlanActivityRecord {
  return {
    id: "plan_activity_123",
    userProfileId: "profile_123",
    questId: "quest_123",
    title: "20 Min. lernen",
    activityDate,
    activityTime: "10:00",
    type: "QUEST",
    completed: false,
    sortOrder: 0,
    createdAt,
    updatedAt,
    ...overrides,
  };
}

function createPlanActivityService(
  overrides: Partial<PlanActivityService> = {},
): PlanActivityService {
  return {
    listForAuthUserId: vi.fn().mockResolvedValue([createPlanActivity()]),
    createForAuthUserId: vi.fn().mockResolvedValue(createPlanActivity()),
    updateForAuthUserId: vi.fn().mockResolvedValue(
      createPlanActivity({
        completed: true,
      }),
    ),
    deleteForAuthUserId: vi.fn().mockResolvedValue(true),
    ...overrides,
  };
}

async function withServer(
  planActivityService: PlanActivityService,
  test: (server: Server) => Promise<void>,
) {
  const server = createApp({ planActivityService }).listen(0);

  try {
    await test(server);
  } finally {
    server.close();
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("plan-activity API", () => {
  it("rejects plan-activity requests without authentication", async () => {
    await withServer(createPlanActivityService(), async (server) => {
      const response = await request(server)
        .get("/api/plan-activities")
        .expect(401);

      expect(response.body).toEqual({
        error: {
          code: "UNAUTHORIZED",
          message: "Authentifizierung erforderlich.",
        },
      });
    });
  });

  it("returns the authenticated user's plan activities", async () => {
    const planActivityService = createPlanActivityService({
      listForAuthUserId: vi.fn().mockResolvedValue([
        createPlanActivity(),
        createPlanActivity({
          id: "plan_activity_personal",
          questId: null,
          title: "Sport",
          activityTime: "14:00",
          type: "PERSONAL",
        }),
      ]),
    });

    await withServer(planActivityService, async (server) => {
      const response = await request(server)
        .get("/api/plan-activities?activityDate=2026-10-06")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(200);

      expect(planActivityService.listForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        {
          activityDate,
        },
      );
      expect(response.body).toEqual({
        data: [
          {
            id: "plan_activity_123",
            userProfileId: "profile_123",
            questId: "quest_123",
            title: "20 Min. lernen",
            activityDate: "2026-10-06",
            activityTime: "10:00",
            type: "QUEST",
            completed: false,
            sortOrder: 0,
            createdAt: "2026-10-06T13:15:00.000Z",
            updatedAt: "2026-10-06T13:20:00.000Z",
          },
          {
            id: "plan_activity_personal",
            userProfileId: "profile_123",
            questId: null,
            title: "Sport",
            activityDate: "2026-10-06",
            activityTime: "14:00",
            type: "PERSONAL",
            completed: false,
            sortOrder: 0,
            createdAt: "2026-10-06T13:15:00.000Z",
            updatedAt: "2026-10-06T13:20:00.000Z",
          },
        ],
        meta: {
          count: 2,
        },
      });
    });
  });

  it("returns 404 when reading plan activities without an existing profile", async () => {
    const planActivityService = createPlanActivityService({
      listForAuthUserId: vi.fn().mockResolvedValue("PROFILE_NOT_FOUND"),
    });

    await withServer(planActivityService, async (server) => {
      const response = await request(server)
        .get("/api/plan-activities")
        .set("x-test-auth-user-id", "user_without_profile")
        .expect(404);

      expect(response.body).toEqual({
        error: {
          code: "PROFILE_NOT_FOUND",
          message: "Profil wurde nicht gefunden.",
        },
      });
    });
  });

  it("creates a plan activity for the authenticated user's profile", async () => {
    const planActivityService = createPlanActivityService();

    await withServer(planActivityService, async (server) => {
      const response = await request(server)
        .post("/api/plan-activities")
        .set("x-test-auth-user-id", "user_test_123")
        .send(validPlanActivityInput)
        .expect(201);

      expect(planActivityService.createForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        {
          ...validPlanActivityInput,
          activityDate,
        },
      );
      expect(response.body.data.id).toBe("plan_activity_123");
    });
  });

  it("updates one authenticated user's plan activity", async () => {
    const planActivityService = createPlanActivityService();

    await withServer(planActivityService, async (server) => {
      const response = await request(server)
        .patch("/api/plan-activities/plan_activity_123")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          completed: true,
        })
        .expect(200);

      expect(planActivityService.updateForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        "plan_activity_123",
        {
          completed: true,
        },
      );
      expect(response.body.data.completed).toBe(true);
    });
  });

  it("deletes one authenticated user's plan activity", async () => {
    const planActivityService = createPlanActivityService();

    await withServer(planActivityService, async (server) => {
      await request(server)
        .delete("/api/plan-activities/plan_activity_123")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(204);

      expect(planActivityService.deleteForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        "plan_activity_123",
      );
    });
  });

  it("rejects invalid plan activity input", async () => {
    const planActivityService = createPlanActivityService();

    await withServer(planActivityService, async (server) => {
      const response = await request(server)
        .post("/api/plan-activities")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          title: "",
          activityDate: "06.10.2026",
          activityTime: "25:00",
          type: "QUEST",
        })
        .expect(400);

      expect(response.body.error.code).toBe("VALIDATION_ERROR");
      expect(planActivityService.createForAuthUserId).not.toHaveBeenCalled();
    });
  });

  it("returns 404 when a related quest does not belong to the profile", async () => {
    const planActivityService = createPlanActivityService({
      createForAuthUserId: vi
        .fn()
        .mockResolvedValue("RELATED_RESOURCE_NOT_FOUND"),
    });

    await withServer(planActivityService, async (server) => {
      const response = await request(server)
        .post("/api/plan-activities")
        .set("x-test-auth-user-id", "user_test_123")
        .send(validPlanActivityInput)
        .expect(404);

      expect(response.body).toEqual({
        error: {
          code: "RELATED_RESOURCE_NOT_FOUND",
          message: "Verknüpfte Ressource wurde nicht gefunden.",
        },
      });
    });
  });

  it("returns 404 when updating another user's plan activity", async () => {
    const planActivityService = createPlanActivityService({
      updateForAuthUserId: vi.fn().mockResolvedValue("PLAN_ACTIVITY_NOT_FOUND"),
    });

    await withServer(planActivityService, async (server) => {
      const response = await request(server)
        .patch("/api/plan-activities/foreign_plan_activity")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          completed: true,
        })
        .expect(404);

      expect(response.body).toEqual({
        error: {
          code: "PLAN_ACTIVITY_NOT_FOUND",
          message: "PlanActivity wurde nicht gefunden.",
        },
      });
    });
  });
});
