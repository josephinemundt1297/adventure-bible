import type { Server } from "node:http";
import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import type {
  JournalEntryRecord,
  JournalEntryService,
} from "../src/services/journalEntryService.js";

const createdAt = new Date("2026-10-05T13:20:00.000Z");
const updatedAt = new Date("2026-10-05T13:25:00.000Z");
const entryDate = new Date("2026-10-05T00:00:00.000Z");

const validJournalEntryInput = {
  entryDate: "2026-10-05",
  entryTime: "13:20",
  type: "REFLECTION",
  title: "Mittagsstand",
  content: "QuestLog-Endpunkte sind geschafft.",
} as const;

function createJournalEntry(
  overrides: Partial<JournalEntryRecord> = {},
): JournalEntryRecord {
  return {
    id: "journal_entry_123",
    userProfileId: "profile_123",
    entryDate,
    entryTime: "13:20",
    type: "REFLECTION",
    title: "Mittagsstand",
    content: "QuestLog-Endpunkte sind geschafft.",
    questLogId: null,
    hpCheckId: null,
    createdAt,
    updatedAt,
    ...overrides,
  };
}

function createJournalEntryService(
  overrides: Partial<JournalEntryService> = {},
): JournalEntryService {
  return {
    listForAuthUserId: vi.fn().mockResolvedValue([createJournalEntry()]),
    getByIdForAuthUserId: vi.fn().mockResolvedValue(createJournalEntry()),
    createForAuthUserId: vi.fn().mockResolvedValue(createJournalEntry()),
    updateForAuthUserId: vi.fn().mockResolvedValue(
      createJournalEntry({
        title: "Aktualisierte Reflexion",
      }),
    ),
    deleteForAuthUserId: vi.fn().mockResolvedValue(true),
    ...overrides,
  };
}

async function withServer(
  journalEntryService: JournalEntryService,
  test: (server: Server) => Promise<void>,
) {
  const server = createApp({ journalEntryService }).listen(0);

  try {
    await test(server);
  } finally {
    server.close();
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("journal-entry API", () => {
  it("rejects journal-entry requests without authentication", async () => {
    await withServer(createJournalEntryService(), async (server) => {
      const response = await request(server)
        .get("/api/journal-entries")
        .expect(401);

      expect(response.body).toEqual({
        error: {
          code: "UNAUTHORIZED",
          message: "Authentifizierung erforderlich.",
        },
      });
    });
  });

  it("returns the authenticated user's journal entries", async () => {
    const journalEntryService = createJournalEntryService({
      listForAuthUserId: vi.fn().mockResolvedValue([
        createJournalEntry({
          id: "journal_entry_event",
          type: "EVENT",
          title: "Quest gestartet",
          content: null,
          questLogId: "quest_log_123",
        }),
        createJournalEntry(),
      ]),
    });

    await withServer(journalEntryService, async (server) => {
      const response = await request(server)
        .get("/api/journal-entries?entryDate=2026-10-05&type=REFLECTION")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(200);

      expect(journalEntryService.listForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        {
          entryDate,
          type: "REFLECTION",
        },
      );
      expect(response.body).toEqual({
        data: [
          {
            id: "journal_entry_event",
            userProfileId: "profile_123",
            entryDate: "2026-10-05",
            entryTime: "13:20",
            type: "EVENT",
            title: "Quest gestartet",
            content: null,
            questLogId: "quest_log_123",
            hpCheckId: null,
            createdAt: "2026-10-05T13:20:00.000Z",
            updatedAt: "2026-10-05T13:25:00.000Z",
          },
          {
            id: "journal_entry_123",
            userProfileId: "profile_123",
            entryDate: "2026-10-05",
            entryTime: "13:20",
            type: "REFLECTION",
            title: "Mittagsstand",
            content: "QuestLog-Endpunkte sind geschafft.",
            questLogId: null,
            hpCheckId: null,
            createdAt: "2026-10-05T13:20:00.000Z",
            updatedAt: "2026-10-05T13:25:00.000Z",
          },
        ],
        meta: {
          count: 2,
        },
      });
    });
  });

  it("returns 404 when reading journal entries without an existing profile", async () => {
    const journalEntryService = createJournalEntryService({
      listForAuthUserId: vi.fn().mockResolvedValue("PROFILE_NOT_FOUND"),
    });

    await withServer(journalEntryService, async (server) => {
      const response = await request(server)
        .get("/api/journal-entries")
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

  it("returns one authenticated user's journal entry by id", async () => {
    const journalEntryService = createJournalEntryService();

    await withServer(journalEntryService, async (server) => {
      const response = await request(server)
        .get("/api/journal-entries/journal_entry_123")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(200);

      expect(journalEntryService.getByIdForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        "journal_entry_123",
      );
      expect(response.body.data).toEqual({
        id: "journal_entry_123",
        userProfileId: "profile_123",
        entryDate: "2026-10-05",
        entryTime: "13:20",
        type: "REFLECTION",
        title: "Mittagsstand",
        content: "QuestLog-Endpunkte sind geschafft.",
        questLogId: null,
        hpCheckId: null,
        createdAt: "2026-10-05T13:20:00.000Z",
        updatedAt: "2026-10-05T13:25:00.000Z",
      });
    });
  });

  it("creates a journal entry for the authenticated user's profile", async () => {
    const journalEntryService = createJournalEntryService();

    await withServer(journalEntryService, async (server) => {
      const response = await request(server)
        .post("/api/journal-entries")
        .set("x-test-auth-user-id", "user_test_123")
        .send(validJournalEntryInput)
        .expect(201);

      expect(journalEntryService.createForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        {
          ...validJournalEntryInput,
          entryDate,
        },
      );
      expect(response.body.data.id).toBe("journal_entry_123");
    });
  });

  it("updates one authenticated user's journal entry", async () => {
    const journalEntryService = createJournalEntryService();

    await withServer(journalEntryService, async (server) => {
      const response = await request(server)
        .patch("/api/journal-entries/journal_entry_123")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          title: "Aktualisierte Reflexion",
          content: null,
        })
        .expect(200);

      expect(journalEntryService.updateForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        "journal_entry_123",
        {
          title: "Aktualisierte Reflexion",
          content: null,
        },
      );
      expect(response.body.data.title).toBe("Aktualisierte Reflexion");
    });
  });

  it("deletes one authenticated user's journal entry", async () => {
    const journalEntryService = createJournalEntryService();

    await withServer(journalEntryService, async (server) => {
      await request(server)
        .delete("/api/journal-entries/journal_entry_123")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(204);

      expect(journalEntryService.deleteForAuthUserId).toHaveBeenCalledWith(
        "user_test_123",
        "journal_entry_123",
      );
    });
  });

  it("returns 404 when a related resource does not belong to the user", async () => {
    const journalEntryService = createJournalEntryService({
      createForAuthUserId: vi.fn().mockResolvedValue("RELATED_RESOURCE_NOT_FOUND"),
    });

    await withServer(journalEntryService, async (server) => {
      const response = await request(server)
        .post("/api/journal-entries")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          ...validJournalEntryInput,
          questLogId: "quest_log_foreign",
        })
        .expect(404);

      expect(response.body).toEqual({
        error: {
          code: "RELATED_RESOURCE_NOT_FOUND",
          message: "Verknüpfte Ressource wurde nicht gefunden.",
        },
      });
    });
  });

  it("rejects invalid journal-entry data", async () => {
    const journalEntryService = createJournalEntryService();

    await withServer(journalEntryService, async (server) => {
      const response = await request(server)
        .post("/api/journal-entries")
        .set("x-test-auth-user-id", "user_test_123")
        .send({
          ...validJournalEntryInput,
          entryTime: "25:99",
        })
        .expect(400);

      expect(journalEntryService.createForAuthUserId).not.toHaveBeenCalled();
      expect(response.body).toEqual({
        error: {
          code: "VALIDATION_ERROR",
          message: "Die Anfrage enthält ungültige JournalEntry-Daten.",
        },
      });
    });
  });
});
