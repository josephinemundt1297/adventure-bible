import { Router, type Response } from "express";
import { type AuthenticatedRequest, requireAuth } from "../middlewares/auth.js";
import { profileInputSchema } from "../schemas/profile.js";
import {
  type Profile,
  type ProfileService,
  prismaProfileService,
} from "../services/profileService.js";

function serializeProfile(profile: Profile) {
  return {
    id: profile.id,
    authUserId: profile.authUserId,
    displayName: profile.displayName,
    characterName: profile.characterName,
    level: profile.level,
    xp: profile.xp,
    questPoints: profile.questPoints,
    createdAt: profile.createdAt.toISOString(),
    updatedAt: profile.updatedAt.toISOString(),
  };
}

function validationError(response: Response) {
  response.status(400).json({
    error: {
      code: "VALIDATION_ERROR",
      message: "Die Anfrage enthält ungültige Profildaten.",
    },
  });
}

export function createProfileRouter(
  profileService: ProfileService = prismaProfileService,
) {
  const router = Router();

  router.get("/profile", requireAuth, async (request, response: Response) => {
    const authenticatedRequest = request as AuthenticatedRequest;
    const profile = await profileService.getByAuthUserId(
      authenticatedRequest.auth.authUserId,
    );

    if (!profile) {
      response.status(404).json({
        error: {
          code: "PROFILE_NOT_FOUND",
          message: "Profil wurde nicht gefunden.",
        },
      });
      return;
    }

    response.status(200).json({
      data: serializeProfile(profile),
    });
  });

  router.put("/profile", requireAuth, async (request, response: Response) => {
    const authenticatedRequest = request as AuthenticatedRequest;
    const parsedBody = profileInputSchema.safeParse(request.body);

    if (!parsedBody.success) {
      validationError(response);
      return;
    }

    const profile = await profileService.upsertForAuthUserId(
      authenticatedRequest.auth.authUserId,
      parsedBody.data,
    );

    response.status(200).json({
      data: serializeProfile(profile),
    });
  });

  return router;
}
