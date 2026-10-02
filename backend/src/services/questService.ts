import type { Quest } from "@prisma/client";
import { prisma } from "../database/prisma.js";
import type { QuestInput, QuestUpdateInput } from "../schemas/quest.js";

export type QuestRecord = Quest;

export interface QuestService {
  listForAuthUserId(authUserId: string): Promise<QuestRecord[] | null>;
  getByIdForAuthUserId(
    authUserId: string,
    questId: string,
  ): Promise<QuestRecord | null>;
  createForAuthUserId(
    authUserId: string,
    input: QuestInput,
  ): Promise<QuestRecord | null>;
  updateForAuthUserId(
    authUserId: string,
    questId: string,
    input: QuestUpdateInput,
  ): Promise<QuestRecord | null>;
}

export const prismaQuestService: QuestService = {
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

    return prisma.quest.findMany({
      where: {
        userProfileId: profile.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async getByIdForAuthUserId(authUserId, questId) {
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

    return prisma.quest.findFirst({
      where: {
        id: questId,
        userProfileId: profile.id,
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

    return prisma.quest.create({
      data: {
        userProfileId: profile.id,
        title: input.title,
        description: input.description,
        type: input.type,
        difficulty: input.difficulty,
        estimatedMinutes: input.estimatedMinutes,
        xpReward: input.xpReward ?? 0,
        questPointReward: input.questPointReward ?? 0,
      },
    });
  },

  async updateForAuthUserId(authUserId, questId, input) {
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
        id: questId,
        userProfileId: profile.id,
      },
      select: {
        id: true,
      },
    });

    if (!quest) {
      return null;
    }

    return prisma.quest.update({
      where: {
        id: quest.id,
      },
      data: input,
    });
  },
};
