import type { QuestLog } from "@prisma/client";
import { prisma } from "../database/prisma.js";
import type {
  QuestLogInput,
  QuestLogUpdateInput,
} from "../schemas/questLog.js";

export type QuestLogRecord = QuestLog;

export interface QuestLogService {
  listForAuthUserId(authUserId: string): Promise<QuestLogRecord[] | null>;
  createForAuthUserId(
    authUserId: string,
    input: QuestLogInput,
  ): Promise<QuestLogRecord | null>;
  updateForAuthUserId(
    authUserId: string,
    questLogId: string,
    input: QuestLogUpdateInput,
  ): Promise<QuestLogRecord | null>;
}

function startedAtForStatus(status: QuestLog["status"]): Date | undefined {
  return status === "STARTED" || status === "COMPLETED"
    ? new Date()
    : undefined;
}

function completedAtForStatus(status: QuestLog["status"]): Date | undefined {
  return status === "COMPLETED" ? new Date() : undefined;
}

export const prismaQuestLogService: QuestLogService = {
  async listForAuthUserId(authUserId) {
    const profile = await prisma.userProfile.findUnique({
      where: {
        authUserId,
      },
      select: {
        id: true,
      },
    });

    if (!profile) {
      return null;
    }

    return prisma.questLog.findMany({
      where: {
        userProfileId: profile.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async createForAuthUserId(authUserId, input) {
    const profile = await prisma.userProfile.findUnique({
      where: {
        authUserId,
      },
      select: {
        id: true,
      },
    });

    if (!profile) {
      return null;
    }

    const quest = await prisma.quest.findFirst({
      where: {
        id: input.questId,
        userProfileId: profile.id,
      },
      select: {
        id: true,
        xpReward: true,
        questPointReward: true,
      },
    });

    if (!quest) {
      return null;
    }

    const status = input.status ?? "STARTED";
    const scorePoints = status === "COMPLETED" ? quest.questPointReward : null;

    return prisma.$transaction(async (transaction) => {
      const questLog = await transaction.questLog.create({
        data: {
          userProfileId: profile.id,
          questId: quest.id,
          status,
          startedAt: startedAtForStatus(status),
          completedAt: completedAtForStatus(status),
          scorePoints,
          note: input.note,
        },
      });

      if (status === "COMPLETED") {
        await transaction.userProfile.update({
          where: {
            id: profile.id,
          },
          data: {
            xp: {
              increment: quest.xpReward,
            },
            questPoints: {
              increment: quest.questPointReward,
            },
          },
        });
      }

      return questLog;
    });
  },

  async updateForAuthUserId(authUserId, questLogId, input) {
    const profile = await prisma.userProfile.findUnique({
      where: {
        authUserId,
      },
      select: {
        id: true,
      },
    });

    if (!profile) {
      return null;
    }

    const questLog = await prisma.questLog.findFirst({
      where: {
        id: questLogId,
        userProfileId: profile.id,
      },
      include: {
        quest: {
          select: {
            xpReward: true,
            questPointReward: true,
          },
        },
      },
    });

    if (!questLog) {
      return null;
    }

    const nextStatus = input.status ?? questLog.status;
    const shouldAwardQuest =
      questLog.status !== "COMPLETED" && nextStatus === "COMPLETED";

    return prisma.$transaction(async (transaction) => {
      const updatedQuestLog = await transaction.questLog.update({
        where: {
          id: questLog.id,
        },
        data: {
          status: input.status,
          note: input.note,
          completedAt: shouldAwardQuest ? new Date() : undefined,
          scorePoints: shouldAwardQuest
            ? questLog.quest.questPointReward
            : undefined,
        },
      });

      if (shouldAwardQuest) {
        await transaction.userProfile.update({
          where: {
            id: profile.id,
          },
          data: {
            xp: {
              increment: questLog.quest.xpReward,
            },
            questPoints: {
              increment: questLog.quest.questPointReward,
            },
          },
        });
      }

      return updatedQuestLog;
    });
  },
};
