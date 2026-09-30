import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  _error,
  _request,
  response,
  _next,
) => {
  response.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Ein unerwarteter Fehler ist aufgetreten.",
    },
  });
};
