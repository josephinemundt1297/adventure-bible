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
      }),
    ).toEqual({
      body: 0,
      energy: 25,
      focus: 50,
      mood: 75,
      overallScore: 38,
    });
  });

  it("supports averaged area answers from the frontend questionnaire", () => {
    expect(
      calculateHpCheckScores({
        type: "FULL",
        body: 3.3333333333333335,
        energy: 2,
        focus: 4,
        mood: 3,
      }),
    ).toMatchObject({
      body: 58,
      energy: 25,
      focus: 75,
      overallScore: 52,
    });
  });
});
