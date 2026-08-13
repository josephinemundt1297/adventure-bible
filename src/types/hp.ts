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

export interface HpQuestion {
  id: string;
  area: HpArea;
  question: string;
}

export interface HpAnswer {
  questionId: string;
  value: 1 | 2 | 3 | 4 | 5;
}

export interface HpAreaScore {
  area: HpArea;
  score: number;
}

export interface HpState {
  areas: HpAreaScore[];
  overall: number;
}
