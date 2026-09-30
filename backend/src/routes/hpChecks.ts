import { Router, type Response } from "express";
import { type AuthenticatedRequest, requireAuth } from "../middlewares/auth.js";
import { hpCheckInputSchema } from "../schemas/hpCheck.js";
import {
  type HpCheckRecord,
  type HpCheckService,
  prismaHpCheckService,
} from "../services/hpCheckService.js";

function serializeHpCheck(hpCheck: HpCheckRecord) {
  return {
    id: hpCheck.id,
    userProfileId: hpCheck.userProfileId,
    type: hpCheck.type,
    body: hpCheck.body,
    energy: hpCheck.energy,
    focus: hpCheck.focus,
    mood: hpCheck.mood,
    muscle: hpCheck.muscle,
    nutrition: hpCheck.nutrition,
    recovery: hpCheck.recovery,
    overallScore: hpCheck.overallScore,
    createdAt: hpCheck.createdAt.toISOString(),
  };
}

function validationError(response: Response) {
  response.status(400).json({
    error: {
      code: "VALIDATION_ERROR",
      message: "Die Anfrage enthält ungültige HP-Check-Daten.",
    },
  });
}

export function createHpChecksRouter(
  hpCheckService: HpCheckService = prismaHpCheckService,
) {
  const router = Router();

  router.post("/hp-checks", requireAuth, async (request, response: Response) => {
    const authenticatedRequest = request as AuthenticatedRequest;
    const parsedBody = hpCheckInputSchema.safeParse(request.body);

    if (!parsedBody.success) {
      validationError(response);
      return;
    }

    const hpCheck = await hpCheckService.createForAuthUserId(
      authenticatedRequest.auth.authUserId,
      parsedBody.data,
    );

    if (!hpCheck) {
      response.status(404).json({
        error: {
          code: "PROFILE_NOT_FOUND",
          message: "Profil wurde nicht gefunden.",
        },
      });
      return;
    }

    response.status(201).json({
      data: serializeHpCheck(hpCheck),
    });
  });

  return router;
}
