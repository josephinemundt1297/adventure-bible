import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildBackendHpCheckInput,
  buildBackendMiniHpCheckInput,
  listBackendHpChecks,
} from "../src/lib/backendHpChecks";
import type { HpAnswer } from "../src/types/hp";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("backend hp-check input", () => {
  it("averages frontend questionnaire answers for the backend hp-check endpoint", () => {
    const answers: HpAnswer[] = [
      { questionId: "body-1", value: 3 },
      { questionId: "body-2", value: 4 },
      { questionId: "body-3", value: 3 },
      { questionId: "energy-1", value: 2 },
      { questionId: "focus-1", value: 4 },
      { questionId: "mood-1", value: 3 },
    ];

    expect(buildBackendHpCheckInput(answers)).toEqual({
      type: "FULL",
      body: 10 / 3,
      energy: 2,
      focus: 4,
      mood: 3,
    });
  });

  it("maps mini hp slider values to backend answers", () => {
    expect(
      buildBackendMiniHpCheckInput({
        completedAt: "2026-10-06T09:30:00.000Z",
        values: [
          { area: "energy", value: 0 },
          { area: "focus", value: 50 },
          { area: "mood", value: 100 },
          { area: "body", value: 75 },
        ],
      }),
    ).toEqual({
      type: "MINI",
      body: 4,
      energy: 1,
      focus: 3,
      mood: 5,
    });
  });

  it("loads hp-checks from the backend with the auth token", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: [], meta: { count: 0 } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      listBackendHpChecks({
        getToken: () => Promise.resolve("session-token"),
      }),
    ).resolves.toEqual({ data: [], meta: { count: 0 } });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/hp-checks", {
      body: undefined,
      headers: {
        Authorization: "Bearer session-token",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  });
});
