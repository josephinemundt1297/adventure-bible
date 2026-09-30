import type {
  DayJournalEntry,
  DayJournalEvent,
  DayJournalEventInput,
  ReflectionEntry,
} from "../types/dayJournal";

export const DAY_JOURNAL_KEY = "adventure-bible:day-journal";

type DayJournalStore = Record<string, DayJournalEntry>;

function createId(prefix: string, createdAt: string) {
  return `${prefix}-${createdAt}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getJournalDate(date = new Date()): string {
  return date.toLocaleDateString("en-CA");
}

function emptyDay(date: string): DayJournalEntry {
  return { date, events: [] };
}

function readStore(): DayJournalStore {
  const stored = localStorage.getItem(DAY_JOURNAL_KEY);
  if (!stored) return {};

  try {
    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as DayJournalStore;
  } catch {
    // Wenn lokale Journal-Daten kaputt sind, starten wir sauber statt die App zu blockieren.
    localStorage.removeItem(DAY_JOURNAL_KEY);
    return {};
  }
}

function writeStore(store: DayJournalStore) {
  localStorage.setItem(DAY_JOURNAL_KEY, JSON.stringify(store));
}

export function readDayJournal(date = getJournalDate()): DayJournalEntry {
  return readStore()[date] ?? emptyDay(date);
}

export function readAllDayJournals(): DayJournalEntry[] {
  return Object.values(readStore()).sort((a, b) => a.date.localeCompare(b.date));
}

export function appendDayJournalEvent(
  event: DayJournalEventInput,
  date = getJournalDate(),
  createdAt = new Date().toISOString(),
): DayJournalEntry {
  const store = readStore();
  const current = store[date] ?? emptyDay(date);
  const nextEvent = {
    ...event,
    id: createId(event.type, createdAt),
    createdAt,
  } as DayJournalEvent;

  const nextDay: DayJournalEntry = {
    ...current,
    events: [...current.events, nextEvent],
  };

  writeStore({ ...store, [date]: nextDay });
  return nextDay;
}

export function saveDayReflection(
  reflection: Omit<ReflectionEntry, "updatedAt">,
  date = getJournalDate(),
  updatedAt = new Date().toISOString(),
): DayJournalEntry {
  const store = readStore();
  const current = store[date] ?? emptyDay(date);
  const nextDay: DayJournalEntry = {
    ...current,
    reflection: {
      ...reflection,
      updatedAt,
    },
  };

  writeStore({ ...store, [date]: nextDay });
  return nextDay;
}
