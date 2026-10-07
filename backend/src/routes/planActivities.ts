import { Router, type Response } from "express";
import { type AuthenticatedRequest, requireAuth } from "../middlewares/auth.js";
import {
  planActivityInputSchema,
  planActivityUpdateInputSchema,
} from "../schemas/planActivity.js";
import {
  type PlanActivityFilters,
  type PlanActivityRecord,
  type PlanActivityService,
  type PlanActivityWriteError,
  prismaPlanActivityService,
} from "../services/planActivityService.js";

function serializePlanActivity(planActivity: PlanActivityRecord) {
  return {
    id: planActivity.id,
    userProfileId: planActivity.userProfileId,
    questId: planActivity.questId,
    title: planActivity.title,
    activityDate: planActivity.activityDate.toISOString().slice(0, 10),
    activityTime: planActivity.activityTime,
    type: planActivity.type,
    completed: planActivity.completed,
    sortOrder: planActivity.sortOrder,
    createdAt: planActivity.createdAt.toISOString(),
    updatedAt: planActivity.updatedAt.toISOString(),
  };
}

function validationError(response: Response) {
  response.status(400).json({
    error: {
      code: "VALIDATION_ERROR",
      message: "Die Anfrage enthält ungültige PlanActivity-Daten.",
    },
  });
}

function parseDateFilter(value: unknown) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10) === value ? date : null;
}

function parseFilters(query: AuthenticatedRequest["query"]) {
  const filters: PlanActivityFilters = {};

  if (query.activityDate !== undefined) {
    const activityDate = parseDateFilter(query.activityDate);

    if (!activityDate) {
      return null;
    }

    filters.activityDate = activityDate;
  }

  return filters;
}

function writeError(response: Response, error: PlanActivityWriteError) {
  if (error === "PROFILE_NOT_FOUND") {
    response.status(404).json({
      error: {
        code: "PROFILE_NOT_FOUND",
        message: "Profil wurde nicht gefunden.",
      },
    });
    return;
  }

  if (error === "RELATED_RESOURCE_NOT_FOUND") {
    response.status(404).json({
      error: {
        code: "RELATED_RESOURCE_NOT_FOUND",
        message: "Verknüpfte Ressource wurde nicht gefunden.",
      },
    });
    return;
  }

  response.status(404).json({
    error: {
      code: "PLAN_ACTIVITY_NOT_FOUND",
      message: "PlanActivity wurde nicht gefunden.",
    },
  });
}

export function createPlanActivitiesRouter(
  planActivityService: PlanActivityService = prismaPlanActivityService,
) {
  const router = Router();

  router.get(
    "/plan-activities",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const filters = parseFilters(authenticatedRequest.query);

      if (!filters) {
        validationError(response);
        return;
      }

      const planActivities = await planActivityService.listForAuthUserId(
        authenticatedRequest.auth.authUserId,
        filters,
      );

      if (planActivities === "PROFILE_NOT_FOUND") {
        writeError(response, planActivities);
        return;
      }

      response.status(200).json({
        data: planActivities.map(serializePlanActivity),
        meta: {
          count: planActivities.length,
        },
      });
    },
  );

  router.post(
    "/plan-activities",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const parsedBody = planActivityInputSchema.safeParse(request.body);

      if (!parsedBody.success) {
        validationError(response);
        return;
      }

      const planActivity = await planActivityService.createForAuthUserId(
        authenticatedRequest.auth.authUserId,
        parsedBody.data,
      );

      if (typeof planActivity === "string") {
        writeError(response, planActivity);
        return;
      }

      response.status(201).json({
        data: serializePlanActivity(planActivity),
      });
    },
  );

  router.patch(
    "/plan-activities/:id",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const planActivityId = String(request.params.id);
      const parsedBody = planActivityUpdateInputSchema.safeParse(request.body);

      if (!parsedBody.success) {
        validationError(response);
        return;
      }

      const planActivity = await planActivityService.updateForAuthUserId(
        authenticatedRequest.auth.authUserId,
        planActivityId,
        parsedBody.data,
      );

      if (typeof planActivity === "string") {
        writeError(response, planActivity);
        return;
      }

      response.status(200).json({
        data: serializePlanActivity(planActivity),
      });
    },
  );

  router.delete(
    "/plan-activities/:id",
    requireAuth,
    async (request, response: Response) => {
      const authenticatedRequest = request as AuthenticatedRequest;
      const planActivityId = String(request.params.id);
      const result = await planActivityService.deleteForAuthUserId(
        authenticatedRequest.auth.authUserId,
        planActivityId,
      );

      if (result !== true) {
        writeError(response, result);
        return;
      }

      response.status(204).send();
    },
  );

  return router;
}
