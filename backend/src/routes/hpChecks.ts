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

  router.get("/hp-checks", requireAuth, async (request, response: Response) => {
    const authenticatedRequest = request as AuthenticatedRequest;
    const hpChecks = await hpCheckService.listForAuthUserId(
      authenticatedRequest.auth.authUserId,
    );

    if (!hpChecks) {
      response.status(404).json({
        error: {
          code: "PROFILE_NOT_FOUND",
          message: "Profil wurde nicht gefunden.",
        },
      });
      return;
    }

    response.status(200).json({
      data: hpChecks.map(serializeHpCheck),
      meta: {
        count: hpChecks.length,
      },
    });
  });

  router.get(
    "/hp-checks/:id",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const hpCheckId = String(request.params.id);
      const hpCheck = await hpCheckService.getByIdForAuthUserId(
        authenticatedRequest.auth.authUserId,
        hpCheckId,
      );

      if (!hpCheck) {
        response.status(404).json({
          error: {
            code: "HP_CHECK_NOT_FOUND",
            message: "HP-Check wurde nicht gefunden.",
          },
        });
        return;
      }

      response.status(200).json({
        data: serializeHpCheck(hpCheck),
      });
    },
  );

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
