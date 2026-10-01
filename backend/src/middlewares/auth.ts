import type { NextFunction, Request, Response } from "express";
import { config } from "../config.js";

export interface AuthContext {
  authUserId: string;
}

export interface AuthenticatedRequest extends Request {
  auth: AuthContext;
}

const TEST_AUTH_HEADER = "x-test-auth-user-id";

function readDevelopmentAuthUserId(request: Request): string | null {
  if (config.nodeEnv === "production") {
    return null;
  }

  const value = request.header(TEST_AUTH_HEADER);

  if (!value || !value.trim()) {
    return null;
  }

  return value.trim();
}

export function requireAuth(request: Request, response: Response, next: NextFunction) {
  const authUserId = readDevelopmentAuthUserId(request);

  if (!authUserId) {
    response.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Authentifizierung erforderlich.",
      },
    });
    return;
  }

  (request as AuthenticatedRequest).auth = {
    authUserId,
  };

  next();
}
