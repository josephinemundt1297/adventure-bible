export const MINI_HP_AREAS = ["energy", "focus", "mood", "body"] as const;

export type MiniHpArea = (typeof MINI_HP_AREAS)[number];

export interface MiniHpValue {
  area: MiniHpArea;
  value: number;
}

export interface MiniHpState {
  values: MiniHpValue[];
  completedAt: string;
}
