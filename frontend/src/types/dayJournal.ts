import type { HpState } from "./hp";
import type { MiniHpState } from "./miniHp";
import type { Quest } from "./quest";

export type DayJournalEventType =
  | "hp-check"
  | "quest-started"
  | "quest-completed"
  | "mini-hp-check"
  | "campfire-started";

interface BaseDayJournalEvent {
  id: string;
  type: DayJournalEventType;
  createdAt: string;
}

export interface HpCheckJournalEvent extends BaseDayJournalEvent {
  type: "hp-check";
  state: HpState;
}

export interface QuestStartedJournalEvent extends BaseDayJournalEvent {
  type: "quest-started";
  quest: Quest;
}

export interface QuestCompletedJournalEvent extends BaseDayJournalEvent {
  type: "quest-completed";
  quest: Quest;
  rewardXp: number;
  rewardQuestPoints: number;
}

export interface MiniHpCheckJournalEvent extends BaseDayJournalEvent {
  type: "mini-hp-check";
  state: MiniHpState;
}

export interface CampfireStartedJournalEvent extends BaseDayJournalEvent {
  type: "campfire-started";
}

export type DayJournalEvent =
  | HpCheckJournalEvent
  | QuestStartedJournalEvent
  | QuestCompletedJournalEvent
  | MiniHpCheckJournalEvent
  | CampfireStartedJournalEvent;

export type DayJournalEventInput = DayJournalEvent extends infer Event
  ? Event extends DayJournalEvent
    ? Omit<Event, "id" | "createdAt">
    : never
  : never;

export interface ReflectionEntry {
  good: string;
  challenging: string;
  grateful: string;
  tomorrow: string;
  updatedAt: string;
}

export interface DayJournalEntry {
  date: string;
  events: DayJournalEvent[];
  reflection?: ReflectionEntry;
}
