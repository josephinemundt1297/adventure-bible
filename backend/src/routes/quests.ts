import { Router, type Response } from "express";
import { type AuthenticatedRequest, requireAuth } from "../middlewares/auth.js";
import { questInputSchema, questUpdateInputSchema } from "../schemas/quest.js";
import {
  type QuestRecord,
  type QuestService,
  prismaQuestService,
} from "../services/questService.js";

function serializeQuest(quest: QuestRecord) {
  return {
    id: quest.id,
    userProfileId: quest.userProfileId,
    title: quest.title,
    description: quest.description,
    type: quest.type,
    difficulty: quest.difficulty,
    estimatedMinutes: quest.estimatedMinutes,
    xpReward: quest.xpReward,
    questPointReward: quest.questPointReward,
    isArchived: quest.isArchived,
    createdAt: quest.createdAt.toISOString(),
    updatedAt: quest.updatedAt.toISOString(),
  };
}

function validationError(response: Response) {
  response.status(400).json({
    error: {
      code: "VALIDATION_ERROR",
      message: "Die Anfrage enthält ungültige Quest-Daten.",
    },
  });
}

export function createQuestsRouter(
  questService: QuestService = prismaQuestService,
) {
  const router = Router();

  router.get("/quests", requireAuth, async (request, response: Response) => {
    const authenticatedRequest = request as AuthenticatedRequest;
    const quests = await questService.listForAuthUserId(
      authenticatedRequest.auth.authUserId,
    );

    if (!quests) {
      response.status(404).json({
        error: {
          code: "PROFILE_NOT_FOUND",
          message: "Profil wurde nicht gefunden.",
        },
      });
      return;
    }

    response.status(200).json({
      data: quests.map(serializeQuest),
      meta: {
        count: quests.length,
      },
    });
  });

  router.get(
    "/quests/:id",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const questId = String(request.params.id);
      const quest = await questService.getByIdForAuthUserId(
        authenticatedRequest.auth.authUserId,
        questId,
      );

      if (!quest) {
        response.status(404).json({
          error: {
            code: "QUEST_NOT_FOUND",
            message: "Quest wurde nicht gefunden.",
          },
        });
        return;
      }

      response.status(200).json({
        data: serializeQuest(quest),
      });
    },
  );

  router.post("/quests", requireAuth, async (request, response: Response) => {
    const authenticatedRequest = request as AuthenticatedRequest;
    const parsedBody = questInputSchema.safeParse(request.body);

    if (!parsedBody.success) {
      validationError(response);
      return;
    }

    const quest = await questService.createForAuthUserId(
      authenticatedRequest.auth.authUserId,
      parsedBody.data,
    );

    if (!quest) {
      response.status(404).json({
        error: {
          code: "PROFILE_NOT_FOUND",
          message: "Profil wurde nicht gefunden.",
        },
      });
      return;
    }

    response.status(201).json({
      data: serializeQuest(quest),
    });
  });

  router.patch(
    "/quests/:id",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const questId = String(request.params.id);
      const parsedBody = questUpdateInputSchema.safeParse(request.body);

      if (!parsedBody.success) {
        validationError(response);
        return;
      }

      const quest = await questService.updateForAuthUserId(
        authenticatedRequest.auth.authUserId,
        questId,
        parsedBody.data,
      );

      if (!quest) {
        response.status(404).json({
          error: {
            code: "QUEST_NOT_FOUND",
            message: "Quest wurde nicht gefunden.",
          },
        });
        return;
      }

      response.status(200).json({
        data: serializeQuest(quest),
      });
    },
  );

  return router;
}
