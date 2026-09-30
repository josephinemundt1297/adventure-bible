import cors from "cors";
import express, { type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { config } from "./config.js";
import { authCheckRouter } from "./routes/authCheck.js";

export function createApp() {
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

  return app;
}
