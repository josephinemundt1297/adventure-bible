import type { UserProfile } from "@prisma/client";
import { prisma } from "../database/prisma.js";
import type { ProfileInput } from "../schemas/profile.js";

export type Profile = UserProfile;

export interface ProfileService {
  getByAuthUserId(authUserId: string): Promise<Profile | null>;
  upsertForAuthUserId(authUserId: string, input: ProfileInput): Promise<Profile>;
}

export const prismaProfileService: ProfileService = {
  getByAuthUserId(authUserId) {
    return prisma.userProfile.findUnique({
      where: {
        authUserId,
      },
    });
  },

  upsertForAuthUserId(authUserId, input) {
    return prisma.userProfile.upsert({
      where: {
        authUserId,
      },
      create: {
        authUserId,
        ...input,
      },
      update: input,
    });
  },
};
