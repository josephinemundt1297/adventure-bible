export const CAMPFIRE_STATE_KEY = "adventure-bible:campfire";

export interface CampfireState {
  startedAt: string;
}

export function startCampfire(): CampfireState {
  const state: CampfireState = { startedAt: new Date().toISOString() };
  sessionStorage.setItem(CAMPFIRE_STATE_KEY, JSON.stringify(state));
  return state;
}

export function readCampfire(): CampfireState | null {
  const stored = sessionStorage.getItem(CAMPFIRE_STATE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as CampfireState;
  } catch {
    sessionStorage.removeItem(CAMPFIRE_STATE_KEY);
    return null;
  }
}

export function leaveCampfire() {
  sessionStorage.removeItem(CAMPFIRE_STATE_KEY);
}
