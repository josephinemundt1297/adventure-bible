import type { QuestLogStatus } from "@prisma/client";
import type { Server } from "node:http";
import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import type {
  QuestLogRecord,
  QuestLogService,
} from "../src/services/questLogService.js";

const createdAt = new Date("2026-10-05T10:45:00.000Z");
const updatedAt = new Date("2026-10-05T10:50:00.000Z");
const startedAt = new Date("2026-10-05T10:46:00.000Z");
const completedAt = new Date("2026-10-05T11:00:00.000Z");

const validQuestLogInput = {
  questId: "quest_123",
  note: "Ich starte mit 10 Minuten.",
} as const;

function createQuestLog(
  overrides: Partial<QuestLogRecord> = {},
): QuestLogRecord {
  return {
    id: "quest_log_123",
    userProfileId: "profile_123",
    questId: "quest_123",
    status: "STARTED",
    startedAt,
    completedAt: null,
    scorePoints: null,
    note: "Ich starte mit 10 Minuten.",
    createdAt,
    updatedAt,
    ...overrides,
  };
}

function createQuestLogService(
  overrides: Partial<QuestLogService> = {},
): QuestLogService {
  return {
    listForAuthUserId: vi.fn().mockResolvedValue([createQuestLog()]),
    createForAuthUserId: vi.fn().mockResolvedValue(createQuestLog()),
    updateForAuthUserId: vi.fn().mockResolvedValue(
      createQuestLog({
        status: "COMPLETED",
        completedAt,
        scorePoints: 1,
      }),
    ),
    ...overrides,
  };
}

async function withServer(
  questLogService: QuestLogService,
  test: (server: Server) => Promise<void>,
) {
  const server = createApp({ questLogService }).listen(0);

  try {
    await test(server);
  } finally {
    server.close();
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("quest-log API", () => {
  it("rejects quest-log requests without authentication", async () => {
    await withServer(createQuestLogService(), async (server) => {
      const response = await request(server).get("/api/quest-logs").expect(401);

      expect(response.body).toEqual({
        error: {
          code: "UNAUTHORIZED",
          message: "Authentifizierung erforderlich.",
        },
      });
    });
  });

  it("returns the authenticated user's quest logs", async () => {
    const questLogService = createQuestLogService({
      listForAuthUserId: vi.fn().mockResolvedValue([
        createQuestLog({
          id: "quest_log_completed",
          status: "COMPLETED",
          completedAt,
          scorePoints: 1,
          note: null,
        }),
        createQuestLog(),
      ]),
    });

    await withServer(questLogService, async (server) => {
      const response = await request(server)
        .get("/api/quest-logs")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(200);

      expect(questLogService.listForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
      );
      expect(response.body).toEqual({
        data: [
          {
            id: "quest_log_completed",
            userProfileId: "profile_123",
            questId: "quest_123",
            status: "COMPLETED",
            startedAt: "2026-10-05T10:46:00.000Z",
            completedAt: "2026-10-05T11:00:00.000Z",
            scorePoints: 1,
            note: null,
            createdAt: "2026-10-05T10:45:00.000Z",
            updatedAt: "2026-10-05T10:50:00.000Z",
          },
          {
            id: "quest_log_123",
            userProfileId: "profile_123",
            questId: "quest_123",
            status: "STARTED",
            startedAt: "2026-10-05T10:46:00.000Z",
            completedAt: null,
            scorePoints: null,
            note: "Ich starte mit 10 Minuten.",
            createdAt: "2026-10-05T10:45:00.000Z",
            updatedAt: "2026-10-05T10:50:00.000Z",
          },
        ],
        meta: {
          count: 2,
        },
      });
    });
  });

  it("returns 404 when reading quest logs without an existing profile", async () => {
    const questLogService = createQuestLogService({
      listForAuthUserId: vi.fn().mockResolvedValue(null),
    });

    await withServer(questLogService, async (server) => {
      const response = await request(server)
        .get("/api/quest-logs")
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

  it("starts a quest for the authenticated user's profile", async () => {
    const questLogService = createQuestLogService();

    await withServer(questLogService, async (server) => {
      const response = await request(server)
        .post("/api/quest-logs")
        .set("x-test-auth-user-id", "user_test_123")
        .send(validQuestLogInput)
        .expect(201);

      expect(questLogService.createForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        validQuestLogInput,
      );
      expect(response.body).toEqual({
        data: {
          id: "quest_log_123",
          userProfileId: "profile_123",
          questId: "quest_123",
          status: "STARTED",
          startedAt: "2026-10-05T10:46:00.000Z",
          completedAt: null,
          scorePoints: null,
          note: "Ich starte mit 10 Minuten.",
          createdAt: "2026-10-05T10:45:00.000Z",
          updatedAt: "2026-10-05T10:50:00.000Z",
        },
      });
    });
  });

  it("passes an explicit completed status to the service", async () => {
    const questLogService = createQuestLogService({
      createForAuthUserId: vi.fn().mockResolvedValue(
        createQuestLog({
          status: "COMPLETED",
          completedAt,
          scorePoints: 1,
        }),
      ),
    });

    await withServer(questLogService, async (server) => {
      await request(server)
        .post("/api/quest-logs")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          questId: "quest_123",
          status: "COMPLETED" satisfies QuestLogStatus,
        })
        .expect(201);

      expect(questLogService.createForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        {
          questId: "quest_123",
          status: "COMPLETED",
        },
      );
    });
  });

  it("updates one authenticated user's quest log", async () => {
    const questLogService = createQuestLogService();

    await withServer(questLogService, async (server) => {
      const response = await request(server)
        .patch("/api/quest-logs/quest_log_123")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          status: "COMPLETED",
        })
        .expect(200);

      expect(questLogService.updateForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        "quest_log_123",
        {
          status: "COMPLETED",
        },
      );
      expect(response.body).toEqual({
        data: {
          id: "quest_log_123",
          userProfileId: "profile_123",
          questId: "quest_123",
          status: "COMPLETED",
          startedAt: "2026-10-05T10:46:00.000Z",
          completedAt: "2026-10-05T11:00:00.000Z",
          scorePoints: 1,
          note: "Ich starte mit 10 Minuten.",
          createdAt: "2026-10-05T10:45:00.000Z",
          updatedAt: "2026-10-05T10:50:00.000Z",
        },
      });
    });
  });

  it("returns 404 when the quest log does not belong to the authenticated user", async () => {
    const questLogService = createQuestLogService({
      updateForAuthUserId: vi.fn().mockResolvedValue(null),
    });

    await withServer(questLogService, async (server) => {
      const response = await request(server)
        .patch("/api/quest-logs/quest_log_foreign")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          status: "COMPLETED",
        })
        .expect(404);

      expect(response.body).toEqual({
        error: {
          code: "QUEST_LOG_NOT_FOUND",
          message: "QuestLog wurde nicht gefunden.",
        },
      });
    });
  });

  it("rejects invalid quest-log data", async () => {
    const questLogService = createQuestLogService();

    await withServer(questLogService, async (server) => {
      const response = await request(server)
        .post("/api/quest-logs")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          questId: "",
        })
        .expect(400);

      expect(questLogService.createForAuthUserId).not.toHaveBeenCalled();
      expect(response.body).toEqual({
        error: {
          code: "VALIDATION_ERROR",
          message: "Die Anfrage enthält ungültige QuestLog-Daten.",
        },
      });
    });
  });
});
