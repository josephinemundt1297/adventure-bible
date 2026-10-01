import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("protected API routes", () => {
  it("rejects requests without authentication", async () => {
    const server = createApp().listen(0);

    try {
      const response = await request(server).get("/api/auth-check").expect(401);

      expect(response.body).toEqual({
        error: {
          code: "UNAUTHORIZED",
          message: "Authentifizierung erforderlich.",
        },
      });
    } finally {
      server.close();
    }
  });

  it("accepts the development auth header outside production", async () => {
    const server = createApp().listen(0);

    try {
      const response = await request(server)
        .get("/api/auth-check")
        .set("x-test-auth-user-id", "user_test_123")
        .expect(200);

      expect(response.body).toEqual({
        data: {
          authUserId: "user_test_123",
        },
      });
    } finally {
      server.close();
    }
  });
});
