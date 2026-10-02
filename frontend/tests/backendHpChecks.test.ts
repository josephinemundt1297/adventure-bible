import { describe, expect, it } from "vitest";
import { buildBackendHpCheckInput } from "../src/lib/backendHpChecks";
import type { HpAnswer } from "../src/types/hp";

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
      muscle: 10 / 3,
      nutrition: 2,
      recovery: 10 / 3,
    });
  });
});
