import { hpQuestions } from "../data/hpQuestions";
import type { HpAnswer, HpArea } from "../types/hp";
import type { MiniHpState } from "../types/miniHp";
import { apiRequest } from "./apiClient";

type BackendHpCheckType = "FULL" | "MINI";

interface BackendHpCheckInput {
  type: BackendHpCheckType;
  body: number;
  energy: number;
  focus: number;
  mood: number;
}

export interface BackendHpCheck {
  id: string;
  userProfileId: string;
  type: BackendHpCheckType;
  body: number;
  energy: number;
  focus: number;
  mood: number;
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
  };
}

function miniValueToBackendAnswer(value: number): number {
  return Math.min(5, Math.max(1, Math.round(value / 25) + 1));
}

function readMiniValue(state: MiniHpState, area: keyof Omit<BackendHpCheckInput, "type">) {
  return state.values.find((value) => value.area === area)?.value ?? 0;
}

export function buildBackendMiniHpCheckInput(state: MiniHpState): BackendHpCheckInput {
  return {
    type: "MINI",
    body: miniValueToBackendAnswer(readMiniValue(state, "body")),
    energy: miniValueToBackendAnswer(readMiniValue(state, "energy")),
    focus: miniValueToBackendAnswer(readMiniValue(state, "focus")),
    mood: miniValueToBackendAnswer(readMiniValue(state, "mood")),
  };
}

export async function saveBackendHpCheck(input: {
  answers: HpAnswer[];
  authUserId?: string;
  getToken?: () => Promise<string | null>;
  type?: BackendHpCheckType;
}) {
  return apiRequest<{ data: BackendHpCheck }>("/api/hp-checks", {
    authUserId: input.authUserId,
    getToken: input.getToken,
    method: "POST",
    body: buildBackendHpCheckInput(input.answers, input.type),
  });
}

export async function saveBackendMiniHpCheck(input: {
  authUserId?: string;
  getToken?: () => Promise<string | null>;
  state: MiniHpState;
}) {
  return apiRequest<{ data: BackendHpCheck }>("/api/hp-checks", {
    authUserId: input.authUserId,
    getToken: input.getToken,
    method: "POST",
    body: buildBackendMiniHpCheckInput(input.state),
  });
}
