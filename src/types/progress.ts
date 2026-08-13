export interface ProgressState {
  xp: number;
  questPoints: number;
  completedQuests: number;
}

export const INITIAL_PROGRESS: ProgressState = {
  xp: 0,
  questPoints: 0,
  completedQuests: 0,
};
