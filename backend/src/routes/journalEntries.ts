import { Router, type Response } from "express";
import { type AuthenticatedRequest, requireAuth } from "../middlewares/auth.js";
import {
  journalEntryInputSchema,
  journalEntryTypeSchema,
  journalEntryUpdateInputSchema,
} from "../schemas/journalEntry.js";
import {
  type JournalEntryFilters,
  type JournalEntryRecord,
  type JournalEntryService,
  type JournalEntryWriteError,
  prismaJournalEntryService,
} from "../services/journalEntryService.js";

function serializeJournalEntry(journalEntry: JournalEntryRecord) {
  return {
    id: journalEntry.id,
    userProfileId: journalEntry.userProfileId,
    entryDate: journalEntry.entryDate?.toISOString().slice(0, 10) ?? null,
    entryTime: journalEntry.entryTime,
    type: journalEntry.type,
    title: journalEntry.title,
    content: journalEntry.content,
    questLogId: journalEntry.questLogId,
    hpCheckId: journalEntry.hpCheckId,
    createdAt: journalEntry.createdAt.toISOString(),
    updatedAt: journalEntry.updatedAt.toISOString(),
  };
}

function validationError(response: Response) {
  response.status(400).json({
    error: {
      code: "VALIDATION_ERROR",
      message: "Die Anfrage enthält ungültige JournalEntry-Daten.",
    },
  });
}

function parseDateFilter(value: unknown) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10) === value ? date : null;
}

function parseFilters(query: AuthenticatedRequest["query"]) {
  const filters: JournalEntryFilters = {};

  if (query.entryDate !== undefined) {
    const entryDate = parseDateFilter(query.entryDate);

    if (!entryDate) {
      return null;
    }

    filters.entryDate = entryDate;
  }

  if (query.from !== undefined) {
    const from = parseDateFilter(query.from);

    if (!from) {
      return null;
    }

    filters.from = from;
  }

  if (query.to !== undefined) {
    const to = parseDateFilter(query.to);

    if (!to) {
      return null;
    }

    filters.to = to;
  }

  if (query.type !== undefined) {
    const parsedType = journalEntryTypeSchema.safeParse(query.type);

    if (!parsedType.success) {
      return null;
    }

    filters.type = parsedType.data;
  }

  return filters;
}

function writeError(response: Response, error: JournalEntryWriteError) {
  if (error === "PROFILE_NOT_FOUND") {
    response.status(404).json({
      error: {
        code: "PROFILE_NOT_FOUND",
        message: "Profil wurde nicht gefunden.",
      },
    });
    return;
  }

  if (error === "RELATED_RESOURCE_NOT_FOUND") {
    response.status(404).json({
      error: {
        code: "RELATED_RESOURCE_NOT_FOUND",
        message: "Verknüpfte Ressource wurde nicht gefunden.",
      },
    });
    return;
  }

  response.status(404).json({
    error: {
      code: "JOURNAL_ENTRY_NOT_FOUND",
      message: "JournalEntry wurde nicht gefunden.",
    },
  });
}

export function createJournalEntriesRouter(
  journalEntryService: JournalEntryService = prismaJournalEntryService,
) {
  const router = Router();

  router.get(
    "/journal-entries",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const filters = parseFilters(authenticatedRequest.query);

      if (!filters) {
        validationError(response);
        return;
      }

      const journalEntries = await journalEntryService.listForAuthUserId(
        authenticatedRequest.auth.authUserId,
        filters,
      );

      if (journalEntries === "PROFILE_NOT_FOUND") {
        writeError(response, journalEntries);
        return;
      }

      response.status(200).json({
        data: journalEntries.map(serializeJournalEntry),
        meta: {
          count: journalEntries.length,
        },
      });
    },
  );

  router.get(
    "/journal-entries/:id",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const journalEntryId = String(request.params.id);
      const journalEntry = await journalEntryService.getByIdForAuthUserId(
        authenticatedRequest.auth.authUserId,
        journalEntryId,
      );

      if (!journalEntry) {
        writeError(response, "JOURNAL_ENTRY_NOT_FOUND");
        return;
      }

      response.status(200).json({
        data: serializeJournalEntry(journalEntry),
      });
    },
  );

  router.post(
    "/journal-entries",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const parsedBody = journalEntryInputSchema.safeParse(request.body);

      if (!parsedBody.success) {
        validationError(response);
        return;
      }

      const journalEntry = await journalEntryService.createForAuthUserId(
        authenticatedRequest.auth.authUserId,
        parsedBody.data,
      );

      if (typeof journalEntry === "string") {
        writeError(response, journalEntry);
        return;
      }

      response.status(201).json({
        data: serializeJournalEntry(journalEntry),
      });
    },
  );

  router.patch(
    "/journal-entries/:id",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const journalEntryId = String(request.params.id);
      const parsedBody = journalEntryUpdateInputSchema.safeParse(request.body);

      if (!parsedBody.success) {
        validationError(response);
        return;
      }

      const journalEntry = await journalEntryService.updateForAuthUserId(
        authenticatedRequest.auth.authUserId,
        journalEntryId,
        parsedBody.data,
      );

      if (typeof journalEntry === "string") {
        writeError(response, journalEntry);
        return;
      }

      response.status(200).json({
        data: serializeJournalEntry(journalEntry),
      });
    },
  );

  router.delete(
    "/journal-entries/:id",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const journalEntryId = String(request.params.id);
      const result = await journalEntryService.deleteForAuthUserId(
        authenticatedRequest.auth.authUserId,
        journalEntryId,
      );

      if (result !== true) {
        writeError(response, result);
        return;
      }

      response.status(204).send();
    },
  );

  return router;
}
