import { Router, type Response } from "express";
import { type AuthenticatedRequest, requireAuth } from "../middlewares/auth.js";
import {
  questLogInputSchema,
  questLogUpdateInputSchema,
} from "../schemas/questLog.js";
import {
  type QuestLogRecord,
  type QuestLogService,
  prismaQuestLogService,
} from "../services/questLogService.js";

function serializeQuestLog(questLog: QuestLogRecord) {
  return {
    id: questLog.id,
    userProfileId: questLog.userProfileId,
    questId: questLog.questId,
    status: questLog.status,
    startedAt: questLog.startedAt?.toISOString() ?? null,
    completedAt: questLog.completedAt?.toISOString() ?? null,
    scorePoints: questLog.scorePoints,
    note: questLog.note,
    createdAt: questLog.createdAt.toISOString(),
    updatedAt: questLog.updatedAt.toISOString(),
  };
}

function validationError(response: Response) {
  response.status(400).json({
    error: {
      code: "VALIDATION_ERROR",
      message: "Die Anfrage enthält ungültige QuestLog-Daten.",
    },
  });
}

export function createQuestLogsRouter(
  questLogService: QuestLogService = prismaQuestLogService,
) {
  const router = Router();

  router.get(
    "/quest-logs",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const questLogs = await questLogService.listForAuthUserId(
        authenticatedRequest.auth.authUserId,
      );

      if (!questLogs) {
        response.status(404).json({
          error: {
            code: "PROFILE_NOT_FOUND",
            message: "Profil wurde nicht gefunden.",
          },
        });
        return;
      }

      response.status(200).json({
        data: questLogs.map(serializeQuestLog),
        meta: {
          count: questLogs.length,
        },
      });
    },
  );

  router.post(
    "/quest-logs",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const parsedBody = questLogInputSchema.safeParse(request.body);

      if (!parsedBody.success) {
        validationError(response);
        return;
      }

      const questLog = await questLogService.createForAuthUserId(
        authenticatedRequest.auth.authUserId,
        parsedBody.data,
      );

      if (!questLog) {
        response.status(404).json({
          error: {
            code: "QUEST_NOT_FOUND",
            message: "Quest wurde nicht gefunden.",
          },
        });
        return;
      }

      response.status(201).json({
        data: serializeQuestLog(questLog),
      });
    },
  );

  router.patch(
    "/quest-logs/:id",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const questLogId = String(request.params.id);
      const parsedBody = questLogUpdateInputSchema.safeParse(request.body);

      if (!parsedBody.success) {
        validationError(response);
        return;
      }

      const questLog = await questLogService.updateForAuthUserId(
        authenticatedRequest.auth.authUserId,
        questLogId,
        parsedBody.data,
      );

      if (!questLog) {
        response.status(404).json({
          error: {
            code: "QUEST_LOG_NOT_FOUND",
            message: "QuestLog wurde nicht gefunden.",
          },
        });
        return;
      }

      response.status(200).json({
        data: serializeQuestLog(questLog),
      });
    },
  );

  return router;
}
