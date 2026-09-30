import { describe, expect, it } from "vitest";
import { calculateHpCheckScores } from "../src/services/hpScore.js";

describe("hp score calculation", () => {
  it("keeps the frontend hp scale from 1-5 answers to 0-100 scores", () => {
    expect(
      calculateHpCheckScores({
        type: "FULL",
        body: 1,
        energy: 2,
        focus: 3,
        mood: 4,
        muscle: 5,
        nutrition: 3,
        recovery: 1,
      }),
    ).toEqual({
      body: 0,
      energy: 25,
      focus: 50,
      mood: 75,
      muscle: 100,
      nutrition: 50,
      recovery: 0,
      overallScore: 43,
    });
  });
});
