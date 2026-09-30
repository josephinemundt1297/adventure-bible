import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("GET /health", () => {
  it("returns an ok status", async () => {
    const server = createApp().listen(0);

    try {
      const response = await request(server).get("/health").expect(200);

      expect(response.body).toEqual({
        data: {
          status: "ok",
        },
      });
    } finally {
      server.close();
    }
  });
});
