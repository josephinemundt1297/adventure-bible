import { Router, type Response } from "express";
import { type AuthenticatedRequest, requireAuth } from "../middlewares/auth.js";

export const authCheckRouter = Router();

authCheckRouter.get(
  "/auth-check",
  requireAuth,
  (request, response: Response) => {
    const authenticatedRequest = request as AuthenticatedRequest;

    response.status(200).json({
      data: {
        authUserId: authenticatedRequest.auth.authUserId,
      },
    });
  },
);
