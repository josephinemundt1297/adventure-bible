export const HP_AREAS = [
  "body",
  "energy",
  "focus",
  "mood",
  "muscles",
  "nutrition",
  "recovery",
] as const;

export type HpArea = (typeof HP_AREAS)[number];

export const HP_CHECK_AREAS = ["body", "energy", "focus", "mood"] as const;

export type HpCheckArea = (typeof HP_CHECK_AREAS)[number];

export interface HpQuestion {
  id: string;
  area: HpCheckArea;
  question: string;
  answerLabels: readonly [string, string, string, string, string];
}

export interface HpAnswer {
  questionId: string;
  value: 1 | 2 | 3 | 4 | 5;
}

export interface HpAreaScore {
  area: HpCheckArea;
  score: number;
}

export interface HpState {
  areas: HpAreaScore[];
  overall: number;
}
