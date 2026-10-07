import { describe, expect, it } from "vitest";
import { hpQuestions } from "../src/data/hpQuestions";
import { HP_CHECK_AREAS } from "../src/types/hp";

describe("hpQuestions", () => {
  it("uses one stable answer scale for every full HP question", () => {
    const expectedScale = ["sehr niedrig", "niedrig", "mittel", "hoch", "sehr hoch"];

    expect(hpQuestions.every((question) => question.answerLabels.join("|") === expectedScale.join("|"))).toBe(true);
  });

  it("includes stress as a mood-related resource question", () => {
    expect(hpQuestions).toContainEqual(
      expect.objectContaining({
        id: "mood-4",
        area: "mood",
        question: "Wie hoch ist deine innere Ruhe und Entlastung gerade?",
      }),
    );
  });

  it("includes irritability as a mood-related resource question", () => {
    expect(hpQuestions).toContainEqual(
      expect.objectContaining({
        id: "mood-5",
        area: "mood",
        question: "Wie hoch ist deine Gelassenheit bei kleinen Reizen heute?",
      }),
    );
  });

  it("phrases questions so they match the low-to-high answer scale", () => {
    expect(hpQuestions.every((question) => question.question.startsWith("Wie hoch ist deine") || question.question.startsWith("Wie hoch ist dein"))).toBe(true);
  });

  it("uses five questions for every HP check category", () => {
    for (const area of HP_CHECK_AREAS) {
      expect(hpQuestions.filter((question) => question.area === area)).toHaveLength(5);
    }
  });
});
