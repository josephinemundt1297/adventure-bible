import cors from "cors";
import express, { type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { config } from "./config.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { authCheckRouter } from "./routes/authCheck.js";
import { createHpChecksRouter } from "./routes/hpChecks.js";
import { createProfileRouter } from "./routes/profile.js";
import type { HpCheckService } from "./services/hpCheckService.js";
import type { ProfileService } from "./services/profileService.js";

interface AppOptions {
  hpCheckService?: HpCheckService;
  profileService?: ProfileService;
}

export function createApp(options: AppOptions = {}) {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: config.frontendOrigin,
    }),
  );
  app.use(express.json());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.get("/health", (_request: Request, response: Response) => {
    response.status(200).json({
      data: {
        status: "ok",
      },
    });
  });
  app.use("/api", authCheckRouter);
  app.use("/api", createProfileRouter(options.profileService));
  app.use("/api", createHpChecksRouter(options.hpCheckService));
  app.use(errorHandler);

  return app;
}
