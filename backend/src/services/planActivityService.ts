import type { PlanActivity, Prisma } from "@prisma/client";
import { prisma } from "../database/prisma.js";
import type {
  PlanActivityInput,
  PlanActivityUpdateInput,
} from "../schemas/planActivity.js";

export type PlanActivityRecord = PlanActivity;

export interface PlanActivityFilters {
  activityDate?: Date;
}

export type PlanActivityWriteError =
  | "PROFILE_NOT_FOUND"
  | "PLAN_ACTIVITY_NOT_FOUND"
  | "RELATED_RESOURCE_NOT_FOUND";

export interface PlanActivityService {
  listForAuthUserId(
    authUserId: string,
    filters?: PlanActivityFilters,
  ): Promise<PlanActivityRecord[] | "PROFILE_NOT_FOUND">;
  createForAuthUserId(
    authUserId: string,
    input: PlanActivityInput,
  ): Promise<PlanActivityRecord | PlanActivityWriteError>;
  updateForAuthUserId(
    authUserId: string,
    planActivityId: string,
    input: PlanActivityUpdateInput,
  ): Promise<PlanActivityRecord | PlanActivityWriteError>;
  deleteForAuthUserId(
    authUserId: string,
    planActivityId: string,
  ): Promise<true | PlanActivityWriteError>;
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

async function questBelongsToProfile(userProfileId: string, questId?: string | null) {
  if (!questId) {
    return true;
  }

  const quest = await prisma.quest.findFirst({
    where: {
      id: questId,
      userProfileId,
    },
    select: {
      id: true,
    },
  });

  return Boolean(quest);
}

function createDateRangeFilter(activityDate?: Date) {
  if (!activityDate) {
    return undefined;
  }

  const nextDay = new Date(activityDate);
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);

  return {
    gte: activityDate,
    lt: nextDay,
  };
}

export const prismaPlanActivityService: PlanActivityService = {
  async listForAuthUserId(authUserId, filters = {}) {
    const profile = await getProfileIdForAuthUserId(authUserId);

    if (!profile) {
      return "PROFILE_NOT_FOUND";
    }

    return prisma.planActivity.findMany({
      where: {
        userProfileId: profile.id,
        activityDate: createDateRangeFilter(filters.activityDate),
      },
      orderBy: [
        {
          activityDate: "asc",
        },
        {
          sortOrder: "asc",
        },
        {
          activityTime: "asc",
        },
      ],
    });
  },

  async createForAuthUserId(authUserId, input) {
    const profile = await getProfileIdForAuthUserId(authUserId);

    if (!profile) {
      return "PROFILE_NOT_FOUND";
    }

    const relatedQuestIsValid = await questBelongsToProfile(
      profile.id,
      input.questId,
    );

    if (!relatedQuestIsValid) {
      return "RELATED_RESOURCE_NOT_FOUND";
    }

    return prisma.planActivity.create({
      data: {
        userProfileId: profile.id,
        title: input.title,
        activityDate: input.activityDate,
        activityTime: input.activityTime,
        type: input.type,
        completed: input.completed,
        sortOrder: input.sortOrder,
        questId: input.questId,
      },
    });
  },

  async updateForAuthUserId(authUserId, planActivityId, input) {
    const profile = await getProfileIdForAuthUserId(authUserId);

    if (!profile) {
      return "PROFILE_NOT_FOUND";
    }

    const planActivity = await prisma.planActivity.findFirst({
      where: {
        id: planActivityId,
        userProfileId: profile.id,
      },
      select: {
        id: true,
      },
    });

    if (!planActivity) {
      return "PLAN_ACTIVITY_NOT_FOUND";
    }

    const relatedQuestIsValid = await questBelongsToProfile(
      profile.id,
      input.questId,
    );

    if (!relatedQuestIsValid) {
      return "RELATED_RESOURCE_NOT_FOUND";
    }

    const data: Prisma.PlanActivityUpdateInput = {
      title: input.title,
      activityDate: input.activityDate,
      activityTime: input.activityTime,
      type: input.type,
      completed: input.completed,
      sortOrder: input.sortOrder,
      quest:
        input.questId === undefined
          ? undefined
          : input.questId === null
            ? { disconnect: true }
            : { connect: { id: input.questId } },
    };

    return prisma.planActivity.update({
      where: {
        id: planActivity.id,
      },
      data,
    });
  },

  async deleteForAuthUserId(authUserId, planActivityId) {
    const profile = await getProfileIdForAuthUserId(authUserId);

    if (!profile) {
      return "PROFILE_NOT_FOUND";
    }

    const planActivity = await prisma.planActivity.findFirst({
      where: {
        id: planActivityId,
        userProfileId: profile.id,
      },
      select: {
        id: true,
      },
    });

    if (!planActivity) {
      return "PLAN_ACTIVITY_NOT_FOUND";
    }

    await prisma.planActivity.delete({
      where: {
        id: planActivity.id,
      },
    });

    return true;
  },
};
