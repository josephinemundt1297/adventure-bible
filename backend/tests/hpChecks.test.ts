import type { Server } from "node:http";
import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { calculateHpCheckScores } from "../src/services/hpScore.js";
import type {
  HpCheckRecord,
  HpCheckService,
} from "../src/services/hpCheckService.js";

const createdAt = new Date("2026-09-30T15:10:00.000Z");

const validHpCheckInput = {
  type: "FULL",
  body: 3,
  energy: 2,
  focus: 4,
  mood: 3,
} as const;

function createHpCheck(overrides: Partial<HpCheckRecord> = {}): HpCheckRecord {
  return {
    id: "hp_check_123",
    userProfileId: "profile_123",
    type: "FULL",
    ...calculateHpCheckScores(validHpCheckInput),
    createdAt,
    ...overrides,
  };
}

function createHpCheckService(
  overrides: Partial<HpCheckService> = {},
): HpCheckService {
  return {
    listForAuthUserId: vi.fn().mockResolvedValue([createHpCheck()]),
    getByIdForAuthUserId: vi.fn().mockResolvedValue(createHpCheck()),
    createForAuthUserId: vi.fn().mockResolvedValue(createHpCheck()),
    ...overrides,
  };
}

async function withServer(
  hpCheckService: HpCheckService,
  test: (server: Server) => Promise<void>,
) {
  const server = createApp({ hpCheckService }).listen(0);

  try {
    await test(server);
  } finally {
    server.close();
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("hp-check API", () => {
  it("rejects hp-check requests without authentication", async () => {
    await withServer(createHpCheckService(), async (server) => {
      const response = await request(server).post("/api/hp-checks").expect(401);

      expect(response.body).toEqual({
        error: {
          code: "UNAUTHORIZED",
          message: "Authentifizierung erforderlich.",
        },
      });
    });
  });

  it("returns the authenticated user's hp-checks", async () => {
    const secondCreatedAt = new Date("2026-10-01T09:30:00.000Z");
    const hpCheckService = createHpCheckService({
      listForAuthUserId: vi.fn().mockResolvedValue([
        createHpCheck({
          id: "hp_check_new",
          type: "MINI",
          body: 100,
          energy: 75,
          focus: 50,
          mood: 50,
          overallScore: 69,
          createdAt: secondCreatedAt,
        }),
        createHpCheck(),
      ]),
    });

    await withServer(hpCheckService, async (server) => {
      const response = await request(server)
        .get("/api/hp-checks")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(200);

      expect(hpCheckService.listForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
      );
      expect(response.body).toEqual({
        data: [
          {
            id: "hp_check_new",
            userProfileId: "profile_123",
            type: "MINI",
            body: 100,
            energy: 75,
            focus: 50,
            mood: 50,
            overallScore: 69,
            createdAt: "2026-10-01T09:30:00.000Z",
          },
          {
            id: "hp_check_123",
            userProfileId: "profile_123",
            type: "FULL",
            body: 50,
            energy: 25,
            focus: 75,
            mood: 50,
            overallScore: 50,
            createdAt: "2026-09-30T15:10:00.000Z",
          },
        ],
        meta: {
          count: 2,
        },
      });
    });
  });

  it("returns 404 when reading hp-checks without an existing profile", async () => {
    const hpCheckService = createHpCheckService({
      listForAuthUserId: vi.fn().mockResolvedValue(null),
    });

    await withServer(hpCheckService, async (server) => {
      const response = await request(server)
        .get("/api/hp-checks")
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

  it("returns one authenticated user's hp-check by id", async () => {
    const hpCheckService = createHpCheckService();

    await withServer(hpCheckService, async (server) => {
      const response = await request(server)
        .get("/api/hp-checks/hp_check_123")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(200);

      expect(hpCheckService.getByIdForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        "hp_check_123",
      );
      expect(response.body).toEqual({
        data: {
          id: "hp_check_123",
          userProfileId: "profile_123",
          type: "FULL",
          body: 50,
          energy: 25,
          focus: 75,
          mood: 50,
          overallScore: 50,
          createdAt: "2026-09-30T15:10:00.000Z",
        },
      });
    });
  });

  it("returns 404 when one hp-check does not belong to the authenticated user", async () => {
    const hpCheckService = createHpCheckService({
      getByIdForAuthUserId: vi.fn().mockResolvedValue(null),
    });

    await withServer(hpCheckService, async (server) => {
      const response = await request(server)
        .get("/api/hp-checks/hp_check_foreign")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(404);

      expect(response.body).toEqual({
        error: {
          code: "HP_CHECK_NOT_FOUND",
          message: "HP-Check wurde nicht gefunden.",
        },
      });
    });
  });

  it("creates a hp-check for the authenticated user's profile", async () => {
    const hpCheckService = createHpCheckService();

    await withServer(hpCheckService, async (server) => {
      const response = await request(server)
        .post("/api/hp-checks")
        .set("x-test-auth-user-id", "user_test_123")
        .send(validHpCheckInput)
        .expect(201);

      expect(hpCheckService.createForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        validHpCheckInput,
      );
      expect(response.body).toEqual({
        data: {
          id: "hp_check_123",
          userProfileId: "profile_123",
          type: "FULL",
          body: 50,
          energy: 25,
          focus: 75,
          mood: 50,
          overallScore: 50,
          createdAt: "2026-09-30T15:10:00.000Z",
        },
      });
    });
  });

  it("rejects invalid hp-check values", async () => {
    const hpCheckService = createHpCheckService();

    await withServer(hpCheckService, async (server) => {
      const response = await request(server)
        .post("/api/hp-checks")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          ...validHpCheckInput,
          energy: 6,
        })
        .expect(400);

      expect(hpCheckService.createForAuthUserId).not.toHaveBeenCalled();
      expect(response.body).toEqual({
        error: {
          code: "VALIDATION_ERROR",
          message: "Die Anfrage enthält ungültige HP-Check-Daten.",
        },
      });
    });
  });

  it("returns 404 when the authenticated user has no profile yet", async () => {
    const hpCheckService = createHpCheckService({
      createForAuthUserId: vi.fn().mockResolvedValue(null),
    });

    await withServer(hpCheckService, async (server) => {
      const response = await request(server)
        .post("/api/hp-checks")
        .set("x-test-auth-user-id", "user_without_profile")
        .send(validHpCheckInput)
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
