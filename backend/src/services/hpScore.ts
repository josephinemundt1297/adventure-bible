import type { HpCheckInput } from "../schemas/hpCheck.js";

const MIN_ANSWER = 1;
const MAX_ANSWER = 5;

export interface HpCheckScores {
  body: number;
  energy: number;
  focus: number;
  mood: number;
  muscle: number;
  nutrition: number;
  recovery: number;
  overallScore: number;
}

function toScore(value: number): number {
  return Math.round(((value - MIN_ANSWER) / (MAX_ANSWER - MIN_ANSWER)) * 100);
}

export function calculateHpCheckScores(input: HpCheckInput): HpCheckScores {
  const scores = {
    body: toScore(input.body),
    energy: toScore(input.energy),
    focus: toScore(input.focus),
    mood: toScore(input.mood),
    muscle: toScore(input.muscle),
    nutrition: toScore(input.nutrition),
    recovery: toScore(input.recovery),
  };

  return {
    ...scores,
    overallScore: Math.round(
      Object.values(scores).reduce((sum, score) => sum + score, 0) /
        Object.values(scores).length,
    ),
  };
}
