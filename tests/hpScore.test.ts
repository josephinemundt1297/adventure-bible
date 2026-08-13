import { describe, expect, it } from "vitest";
import { calculateHpState, getHpAreaScore } from "../src/lib/hpScore";
import type { HpAnswer } from "../src/types/hp";

describe("calculateHpState", () => {
  it("converts answers to area scores and an overall score", () => {
    const answers: HpAnswer[] = [
      { questionId: "body-1", value: 1 },
      { questionId: "energy-1", value: 5 },
    ];

    const state = calculateHpState(answers);

    expect(getHpAreaScore(state, "body")).toBe(0);
    expect(getHpAreaScore(state, "energy")).toBe(100);
    expect(state.overall).toBeGreaterThanOrEqual(0);
    expect(state.overall).toBeLessThanOrEqual(100);
  });

  it("uses the lowest valid score when an area has no answer", () => {
    const state = calculateHpState([]);

    expect(state.areas).toHaveLength(7);
    expect(state.overall).toBe(0);
  });
});
