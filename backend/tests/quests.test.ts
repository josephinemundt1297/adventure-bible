import type { Server } from "node:http";
import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import type {
  QuestRecord,
  QuestService,
} from "../src/services/questService.js";

const createdAt = new Date("2026-10-02T15:40:00.000Z");
const updatedAt = new Date("2026-10-02T15:45:00.000Z");

const validQuestInput = {
  title: "10 Minuten aufräumen",
  description: "Räume eine kleine Fläche sichtbar auf.",
  type: "SIDE",
  difficulty: 2,
  estimatedMinutes: 10,
  xpReward: 20,
  questPointReward: 1,
} as const;

function createQuest(overrides: Partial<QuestRecord> = {}): QuestRecord {
  return {
    id: "quest_123",
    userProfileId: "profile_123",
    title: "10 Minuten aufräumen",
    description: "Räume eine kleine Fläche sichtbar auf.",
    type: "SIDE",
    difficulty: 2,
    estimatedMinutes: 10,
    xpReward: 20,
    questPointReward: 1,
    isArchived: false,
    createdAt,
    updatedAt,
    ...overrides,
  };
}

function createQuestService(
  overrides: Partial<QuestService> = {},
): QuestService {
  return {
    listForAuthUserId: vi.fn().mockResolvedValue([createQuest()]),
    getByIdForAuthUserId: vi.fn().mockResolvedValue(createQuest()),
    createForAuthUserId: vi.fn().mockResolvedValue(createQuest()),
    updateForAuthUserId: vi.fn().mockResolvedValue(createQuest()),
    ...overrides,
  };
}

async function withServer(
  questService: QuestService,
  test: (server: Server) => Promise<void>,
) {
  const server = createApp({ questService }).listen(0);

  try {
    await test(server);
  } finally {
    server.close();
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("quest API", () => {
  it("rejects quest requests without authentication", async () => {
    await withServer(createQuestService(), async (server) => {
      const response = await request(server).get("/api/quests").expect(401);

      expect(response.body).toEqual({
        error: {
          code: "UNAUTHORIZED",
          message: "Authentifizierung erforderlich.",
        },
      });
    });
  });

  it("returns the authenticated user's quests", async () => {
    const secondCreatedAt = new Date("2026-10-02T16:00:00.000Z");
    const secondUpdatedAt = new Date("2026-10-02T16:05:00.000Z");
    const questService = createQuestService({
      listForAuthUserId: vi.fn().mockResolvedValue([
        createQuest({
          id: "quest_new",
          title: "Augenpause",
          description: null,
          type: "RECOVERY",
          difficulty: 1,
          estimatedMinutes: 5,
          xpReward: 15,
          questPointReward: 0,
          createdAt: secondCreatedAt,
          updatedAt: secondUpdatedAt,
        }),
        createQuest(),
      ]),
    });

    await withServer(questService, async (server) => {
      const response = await request(server)
        .get("/api/quests")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(200);

      expect(questService.listForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
      );
      expect(response.body).toEqual({
        data: [
          {
            id: "quest_new",
            userProfileId: "profile_123",
            title: "Augenpause",
            description: null,
            type: "RECOVERY",
            difficulty: 1,
            estimatedMinutes: 5,
            xpReward: 15,
            questPointReward: 0,
            isArchived: false,
            createdAt: "2026-10-02T16:00:00.000Z",
            updatedAt: "2026-10-02T16:05:00.000Z",
          },
          {
            id: "quest_123",
            userProfileId: "profile_123",
            title: "10 Minuten aufräumen",
            description: "Räume eine kleine Fläche sichtbar auf.",
            type: "SIDE",
            difficulty: 2,
            estimatedMinutes: 10,
            xpReward: 20,
            questPointReward: 1,
            isArchived: false,
            createdAt: "2026-10-02T15:40:00.000Z",
            updatedAt: "2026-10-02T15:45:00.000Z",
          },
        ],
        meta: {
          count: 2,
        },
      });
    });
  });

  it("returns 404 when reading quests without an existing profile", async () => {
    const questService = createQuestService({
      listForAuthUserId: vi.fn().mockResolvedValue(null),
    });

    await withServer(questService, async (server) => {
      const response = await request(server)
        .get("/api/quests")
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

  it("creates a quest for the authenticated user's profile", async () => {
    const questService = createQuestService();

    await withServer(questService, async (server) => {
      const response = await request(server)
        .post("/api/quests")
        .set("x-test-auth-user-id", "user_test_123")
        .send(validQuestInput)
        .expect(201);

      expect(questService.createForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        validQuestInput,
      );
      expect(response.body).toEqual({
        data: {
          id: "quest_123",
          userProfileId: "profile_123",
          title: "10 Minuten aufräumen",
          description: "Räume eine kleine Fläche sichtbar auf.",
          type: "SIDE",
          difficulty: 2,
          estimatedMinutes: 10,
          xpReward: 20,
          questPointReward: 1,
          isArchived: false,
          createdAt: "2026-10-02T15:40:00.000Z",
          updatedAt: "2026-10-02T15:45:00.000Z",
        },
      });
    });
  });

  it("returns one authenticated user's quest by id", async () => {
    const questService = createQuestService();

    await withServer(questService, async (server) => {
      const response = await request(server)
        .get("/api/quests/quest_123")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(200);

      expect(questService.getByIdForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        "quest_123",
      );
      expect(response.body).toEqual({
        data: {
          id: "quest_123",
          userProfileId: "profile_123",
          title: "10 Minuten aufräumen",
          description: "Räume eine kleine Fläche sichtbar auf.",
          type: "SIDE",
          difficulty: 2,
          estimatedMinutes: 10,
          xpReward: 20,
          questPointReward: 1,
          isArchived: false,
          createdAt: "2026-10-02T15:40:00.000Z",
          updatedAt: "2026-10-02T15:45:00.000Z",
        },
      });
    });
  });

  it("returns 404 when one quest does not belong to the authenticated user", async () => {
    const questService = createQuestService({
      getByIdForAuthUserId: vi.fn().mockResolvedValue(null),
    });

    await withServer(questService, async (server) => {
      const response = await request(server)
        .get("/api/quests/quest_foreign")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(404);

      expect(response.body).toEqual({
        error: {
          code: "QUEST_NOT_FOUND",
          message: "Quest wurde nicht gefunden.",
        },
      });
    });
  });

  it("trims quest title and description before creation", async () => {
    const questService = createQuestService();

    await withServer(questService, async (server) => {
      await request(server)
        .post("/api/quests")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          ...validQuestInput,
          title: "  Quest mit Umlaut Ä  ",
          description: "  Beschreibung mit Ü  ",
        })
        .expect(201);

      expect(questService.createForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        {
          ...validQuestInput,
          title: "Quest mit Umlaut Ä",
          description: "Beschreibung mit Ü",
        },
      );
    });
  });

  it("rejects invalid quest data", async () => {
    const questService = createQuestService();

    await withServer(questService, async (server) => {
      const response = await request(server)
        .post("/api/quests")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          ...validQuestInput,
          difficulty: 6,
        })
        .expect(400);

      expect(questService.createForAuthUserId).not.toHaveBeenCalled();
      expect(response.body).toEqual({
        error: {
          code: "VALIDATION_ERROR",
          message: "Die Anfrage enthält ungültige Quest-Daten.",
        },
      });
    });
  });

  it("updates one authenticated user's quest", async () => {
    const patchUpdatedAt = new Date("2026-10-02T16:30:00.000Z");
    const questService = createQuestService({
      updateForAuthUserId: vi.fn().mockResolvedValue(
        createQuest({
          title: "Aktualisierte Quest",
          description: "Neue Beschreibung",
          difficulty: 3,
          updatedAt: patchUpdatedAt,
        }),
      ),
    });

    await withServer(questService, async (server) => {
      const response = await request(server)
        .patch("/api/quests/quest_123")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          title: " Aktualisierte Quest ",
          description: " Neue Beschreibung ",
          difficulty: 3,
        })
        .expect(200);

      expect(questService.updateForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        "quest_123",
        {
          title: "Aktualisierte Quest",
          description: "Neue Beschreibung",
          difficulty: 3,
        },
      );
      expect(response.body).toEqual({
        data: {
          id: "quest_123",
          userProfileId: "profile_123",
          title: "Aktualisierte Quest",
          description: "Neue Beschreibung",
          type: "SIDE",
          difficulty: 3,
          estimatedMinutes: 10,
          xpReward: 20,
          questPointReward: 1,
          isArchived: false,
          createdAt: "2026-10-02T15:40:00.000Z",
          updatedAt: "2026-10-02T16:30:00.000Z",
        },
      });
    });
  });

  it("rejects empty quest updates", async () => {
    const questService = createQuestService();

    await withServer(questService, async (server) => {
      const response = await request(server)
        .patch("/api/quests/quest_123")
        .set("x-test-auth-user-id", "user_test_123")
        .send({})
        .expect(400);

      expect(questService.updateForAuthUserId).not.toHaveBeenCalled();
      expect(response.body).toEqual({
        error: {
          code: "VALIDATION_ERROR",
          message: "Die Anfrage enthält ungültige Quest-Daten.",
        },
      });
    });
  });

  it("returns 404 when updating a quest that does not belong to the authenticated user", async () => {
    const questService = createQuestService({
      updateForAuthUserId: vi.fn().mockResolvedValue(null),
    });

    await withServer(questService, async (server) => {
      const response = await request(server)
        .patch("/api/quests/quest_foreign")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          title: "Nicht meine Quest",
        })
        .expect(404);

      expect(response.body).toEqual({
        error: {
          code: "QUEST_NOT_FOUND",
          message: "Quest wurde nicht gefunden.",
        },
      });
    });
  });

  it("returns 404 when creating a quest without an existing profile", async () => {
    const questService = createQuestService({
      createForAuthUserId: vi.fn().mockResolvedValue(null),
    });

    await withServer(questService, async (server) => {
      const response = await request(server)
        .post("/api/quests")
        .set("x-test-auth-user-id", "user_without_profile")
        .send(validQuestInput)
        .expect(404);

      expect(response.body).toEqual({
        error: {
          code: "PROFILE_NOT_FOUND",
          message: "Profil wurde nicht gefunden.",
        },
      });
    });
  });
});
