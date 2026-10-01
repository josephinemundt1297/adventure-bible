import type { Server } from "node:http";
import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import type {
  Profile,
  ProfileService,
} from "../src/services/profileService.js";

const createdAt = new Date("2026-09-30T13:52:00.000Z");
const updatedAt = new Date("2026-09-30T14:12:00.000Z");

function createProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: "profile_123",
    authUserId: "user_test_123",
    displayName: "Josi",
    characterName: "Lumi",
    level: 1,
    xp: 0,
    questPoints: 0,
    createdAt,
    updatedAt,
    ...overrides,
  };
}

function createProfileService(
  overrides: Partial<ProfileService> = {},
): ProfileService {
  return {
    getByAuthUserId: vi.fn().mockResolvedValue(createProfile()),
    upsertForAuthUserId: vi.fn().mockResolvedValue(createProfile()),
    ...overrides,
  };
}

async function withServer(
  profileService: ProfileService,
  test: (server: Server) => Promise<void>,
) {
  const server = createApp({ profileService }).listen(0);

  try {
    await test(server);
  } finally {
    server.close();
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("profile API", () => {
  it("rejects profile requests without authentication", async () => {
    await withServer(createProfileService(), async (server) => {
      const response = await request(server).get("/api/profile").expect(401);

      expect(response.body).toEqual({
        error: {
          code: "UNAUTHORIZED",
          message: "Authentifizierung erforderlich.",
        },
      });
    });
  });

  it("returns the authenticated user's profile", async () => {
    const profileService = createProfileService({
      getByAuthUserId: vi.fn().mockResolvedValue(
        createProfile({
          displayName: "Josi Ä",
          characterName: "Lumi",
        }),
      ),
    });

    await withServer(profileService, async (server) => {
      const response = await request(server)
        .get("/api/profile")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(200);

      expect(profileService.getByAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
      );
      expect(response.body).toEqual({
        data: {
          id: "profile_123",
          authUserId: "user_test_123",
          displayName: "Josi Ä",
          characterName: "Lumi",
          level: 1,
          xp: 0,
          questPoints: 0,
          createdAt: "2026-09-30T13:52:00.000Z",
          updatedAt: "2026-09-30T14:12:00.000Z",
        },
      });
    });
  });

  it("returns 404 when the authenticated user has no profile yet", async () => {
    const profileService = createProfileService({
      getByAuthUserId: vi.fn().mockResolvedValue(null),
    });

    await withServer(profileService, async (server) => {
      const response = await request(server)
        .get("/api/profile")
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

  it("creates or updates the authenticated user's profile with Unicode names", async () => {
    const profileService = createProfileService({
      upsertForAuthUserId: vi.fn().mockResolvedValue(
        createProfile({
          displayName: "Josi Ä",
          characterName: "Lumi Mond",
        }),
      ),
    });

    await withServer(profileService, async (server) => {
      const response = await request(server)
        .put("/api/profile")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          displayName: " Josi Ä ",
          characterName: " Lumi Mond ",
        })
        .expect(200);

      expect(profileService.upsertForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        {
          displayName: "Josi Ä",
          characterName: "Lumi Mond",
        },
      );
      expect(response.body.data.displayName).toBe("Josi Ä");
      expect(response.body.data.characterName).toBe("Lumi Mond");
    });
  });

  it("rejects invalid profile data", async () => {
    const profileService = createProfileService();

    await withServer(profileService, async (server) => {
      const response = await request(server)
        .put("/api/profile")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          displayName: "",
          characterName: "Lumi",
        })
        .expect(400);

      expect(profileService.upsertForAuthUserId).not.toHaveBeenCalled();
      expect(response.body).toEqual({
        error: {
          code: "VALIDATION_ERROR",
          message: "Die Anfrage enthält ungültige Profildaten.",
        },
      });
    });
  });

  it("hides internal errors from the response body", async () => {
    const profileService = createProfileService({
      getByAuthUserId: vi
        .fn()
        .mockRejectedValue(new Error("database connection failed")),
    });

    await withServer(profileService, async (server) => {
      const response = await request(server)
        .get("/api/profile")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(500);

      expect(response.text).not.toContain("database connection failed");
      expect(response.body).toEqual({
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Ein unerwarteter Fehler ist aufgetreten.",
        },
      });
    });
  });
});
