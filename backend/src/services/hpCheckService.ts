import type { HpCheck } from "@prisma/client";
import { prisma } from "../database/prisma.js";
import type { HpCheckInput } from "../schemas/hpCheck.js";
import { calculateHpCheckScores } from "./hpScore.js";

export type HpCheckRecord = HpCheck;

export interface HpCheckService {
  createForAuthUserId(
    authUserId: string,
    input: HpCheckInput,
  ): Promise<HpCheckRecord | null>;
}

export const prismaHpCheckService: HpCheckService = {
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

    return prisma.hpCheck.create({
      data: {
        userProfileId: profile.id,
        type: input.type,
        ...calculateHpCheckScores(input),
      },
    });
  },
};
