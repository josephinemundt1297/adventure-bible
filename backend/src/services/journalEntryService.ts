import type { JournalEntry, Prisma } from "@prisma/client";
import { prisma } from "../database/prisma.js";
import type {
  JournalEntryInput,
  JournalEntryUpdateInput,
} from "../schemas/journalEntry.js";

export type JournalEntryRecord = JournalEntry;

export interface JournalEntryFilters {
  entryDate?: Date;
  from?: Date;
  to?: Date;
  type?: JournalEntry["type"];
}

export type JournalEntryWriteError =
  | "PROFILE_NOT_FOUND"
  | "JOURNAL_ENTRY_NOT_FOUND"
  | "RELATED_RESOURCE_NOT_FOUND";

export interface JournalEntryService {
  listForAuthUserId(
    authUserId: string,
    filters?: JournalEntryFilters,
  ): Promise<JournalEntryRecord[] | "PROFILE_NOT_FOUND">;
  getByIdForAuthUserId(
    authUserId: string,
    journalEntryId: string,
  ): Promise<JournalEntryRecord | null>;
  createForAuthUserId(
    authUserId: string,
    input: JournalEntryInput,
  ): Promise<JournalEntryRecord | JournalEntryWriteError>;
  updateForAuthUserId(
    authUserId: string,
    journalEntryId: string,
    input: JournalEntryUpdateInput,
  ): Promise<JournalEntryRecord | JournalEntryWriteError>;
  deleteForAuthUserId(
    authUserId: string,
    journalEntryId: string,
  ): Promise<true | JournalEntryWriteError>;
}

async function getProfileIdForAuthUserId(authUserId: string) {
  return prisma.userProfile.findUnique({
    where: {
      authUserId,
    },
    select: {
      id: true,
    },
  });
}

async function relatedResourcesBelongToProfile(
  userProfileId: string,
  input: Pick<
    JournalEntryInput | JournalEntryUpdateInput,
    "hpCheckId" | "questLogId"
  >,
) {
  if (input.questLogId) {
    const questLog = await prisma.questLog.findFirst({
      where: {
        id: input.questLogId,
        userProfileId,
      },
      select: {
        id: true,
      },
    });

    if (!questLog) {
      return false;
    }
  }

  if (input.hpCheckId) {
    const hpCheck = await prisma.hpCheck.findFirst({
      where: {
        id: input.hpCheckId,
        userProfileId,
      },
      select: {
        id: true,
      },
    });

    if (!hpCheck) {
      return false;
    }
  }

  return true;
}

function createDateRangeFilter(filters: JournalEntryFilters) {
  if (filters.entryDate) {
    const nextDay = new Date(filters.entryDate);
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);

    return {
      gte: filters.entryDate,
      lt: nextDay,
    };
  }

  if (filters.from || filters.to) {
    return {
      gte: filters.from,
      lte: filters.to,
    };
  }

  return undefined;
}

export const prismaJournalEntryService: JournalEntryService = {
  async listForAuthUserId(authUserId, filters = {}) {
    const profile = await getProfileIdForAuthUserId(authUserId);

    if (!profile) {
      return "PROFILE_NOT_FOUND";
    }

    return prisma.journalEntry.findMany({
      where: {
        userProfileId: profile.id,
        type: filters.type,
        entryDate: createDateRangeFilter(filters),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async getByIdForAuthUserId(authUserId, journalEntryId) {
    const profile = await getProfileIdForAuthUserId(authUserId);

    if (!profile) {
      return null;
    }

    return prisma.journalEntry.findFirst({
      where: {
        id: journalEntryId,
        userProfileId: profile.id,
      },
    });
  },

  async createForAuthUserId(authUserId, input) {
    const profile = await getProfileIdForAuthUserId(authUserId);

    if (!profile) {
      return "PROFILE_NOT_FOUND";
    }

    const relatedResourcesAreValid = await relatedResourcesBelongToProfile(
      profile.id,
      input,
    );

    if (!relatedResourcesAreValid) {
      return "RELATED_RESOURCE_NOT_FOUND";
    }

    return prisma.journalEntry.create({
      data: {
        userProfileId: profile.id,
        entryDate: input.entryDate,
        entryTime: input.entryTime,
        type: input.type,
        title: input.title,
        content: input.content,
        questLogId: input.questLogId,
        hpCheckId: input.hpCheckId,
      },
    });
  },

  async updateForAuthUserId(authUserId, journalEntryId, input) {
    const profile = await getProfileIdForAuthUserId(authUserId);

    if (!profile) {
      return "PROFILE_NOT_FOUND";
    }

    const journalEntry = await prisma.journalEntry.findFirst({
      where: {
        id: journalEntryId,
        userProfileId: profile.id,
      },
      select: {
        id: true,
      },
    });

    if (!journalEntry) {
      return "JOURNAL_ENTRY_NOT_FOUND";
    }

    const relatedResourcesAreValid = await relatedResourcesBelongToProfile(
      profile.id,
      input,
    );

    if (!relatedResourcesAreValid) {
      return "RELATED_RESOURCE_NOT_FOUND";
    }

    const data: Prisma.JournalEntryUpdateInput = {
      entryDate: input.entryDate,
      entryTime: input.entryTime,
      type: input.type,
      title: input.title,
      content: input.content,
      questLog:
        input.questLogId === undefined
          ? undefined
          : input.questLogId === null
            ? { disconnect: true }
            : { connect: { id: input.questLogId } },
      hpCheck:
        input.hpCheckId === undefined
          ? undefined
          : input.hpCheckId === null
            ? { disconnect: true }
            : { connect: { id: input.hpCheckId } },
    };

    return prisma.journalEntry.update({
      where: {
        id: journalEntry.id,
      },
      data,
    });
  },

  async deleteForAuthUserId(authUserId, journalEntryId) {
    const profile = await getProfileIdForAuthUserId(authUserId);

    if (!profile) {
      return "PROFILE_NOT_FOUND";
    }

    const journalEntry = await prisma.journalEntry.findFirst({
      where: {
        id: journalEntryId,
        userProfileId: profile.id,
      },
      select: {
        id: true,
      },
    });

    if (!journalEntry) {
      return "JOURNAL_ENTRY_NOT_FOUND";
    }

    await prisma.journalEntry.delete({
      where: {
        id: journalEntry.id,
      },
    });

    return true;
  },
};
