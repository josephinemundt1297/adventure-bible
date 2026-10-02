import { hpQuestions } from "../data/hpQuestions";
import type { HpAnswer, HpArea } from "../types/hp";
import { apiRequest } from "./apiClient";

type BackendHpCheckType = "FULL" | "MINI";

interface BackendHpCheckInput {
  type: BackendHpCheckType;
  body: number;
  energy: number;
  focus: number;
  mood: number;
  muscle: number;
  nutrition: number;
  recovery: number;
}

export interface BackendHpCheck {
  id: string;
  userProfileId: string;
  type: BackendHpCheckType;
  body: number;
  energy: number;
  focus: number;
  mood: number;
  muscle: number;
  nutrition: number;
  recovery: number;
  overallScore: number;
  createdAt: string;
}

function averageAreaAnswer(answers: HpAnswer[], area: HpArea, fallbackArea?: HpArea): number {
  const areaQuestionIds = hpQuestions
    .filter((question) => question.area === area)
    .map((question) => question.id);
  const values = answers
    .filter((answer) => areaQuestionIds.includes(answer.questionId))
    .map((answer) => answer.value);

  if (!values.length && fallbackArea !== undefined) {
    return averageAreaAnswer(answers, fallbackArea);
  }

  if (!values.length) return 1;

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function buildBackendHpCheckInput(
  answers: HpAnswer[],
  type: BackendHpCheckType = "FULL",
): BackendHpCheckInput {
  return {
    type,
    body: averageAreaAnswer(answers, "body"),
    energy: averageAreaAnswer(answers, "energy"),
    focus: averageAreaAnswer(answers, "focus"),
    mood: averageAreaAnswer(answers, "mood"),
    muscle: averageAreaAnswer(answers, "muscles", "body"),
    nutrition: averageAreaAnswer(answers, "nutrition", "energy"),
    recovery: averageAreaAnswer(answers, "recovery", "body"),
  };
}

export async function saveBackendHpCheck(input: {
  answers: HpAnswer[];
  authUserId: string;
  type?: BackendHpCheckType;
}) {
  return apiRequest<{ data: BackendHpCheck }>("/api/hp-checks", {
    authUserId: input.authUserId,
    method: "POST",
    body: buildBackendHpCheckInput(input.answers, input.type),
  });
}
