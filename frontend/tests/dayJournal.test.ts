import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  appendDayJournalEvent,
  DAY_JOURNAL_KEY,
  getJournalDate,
  readAllDayJournals,
  readDayJournal,
  saveDayReflection,
} from "../src/lib/dayJournal";
import type { HpState } from "../src/types/hp";

function createStorage() {
  let store = new Map<string, string>();

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => {
      store = new Map<string, string>();
    },
    key: (index: number) => [...store.keys()][index] ?? null,
    get length() {
      return store.size;
    },
  } satisfies Storage;
}

const hpState: HpState = {
  areas: [
    { area: "energy", score: 40 },
    { area: "focus", score: 70 },
  ],
  overall: 55,
};

beforeEach(() => {
  vi.spyOn(Math, "random").mockReturnValue(0.123456);
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: createStorage(),
  });
});

describe("dayJournal", () => {
  it("uses a local calendar date as journal key", () => {
    expect(getJournalDate(new Date("2026-07-28T10:30:00.000Z"))).toBe("2026-07-28");
  });

  it("starts with an empty day when nothing is stored", () => {
    expect(readDayJournal("2026-07-28")).toEqual({ date: "2026-07-28", events: [] });
  });

  it("adds day events without deleting older events", () => {
    appendDayJournalEvent(
      { type: "hp-check", state: hpState },
      "2026-07-28",
      "2026-07-28T07:00:00.000Z",
    );
    const day = appendDayJournalEvent(
      { type: "campfire-started" },
      "2026-07-28",
      "2026-07-28T18:00:00.000Z",
    );

    expect(day.events.map((event) => event.type)).toEqual(["hp-check", "campfire-started"]);
    expect(day.events[0]).toMatchObject({
      createdAt: "2026-07-28T07:00:00.000Z",
    });
    expect(day.events[0]?.id).toMatch(/^hp-check-2026-07-28T07:00:00\.000Z-/);
  });

  it("saves reflection on the same journal day", () => {
    appendDayJournalEvent(
      { type: "hp-check", state: hpState },
      "2026-07-28",
      "2026-07-28T07:00:00.000Z",
    );

    const day = saveDayReflection(
      {
        good: "Ich habe eine kleine Sache geschafft.",
        challenging: "Der Morgen war schwer.",
        grateful: "Tee.",
        tomorrow: "Langsam starten.",
      },
      "2026-07-28",
      "2026-07-28T20:00:00.000Z",
    );

    expect(day.events).toHaveLength(1);
    expect(day.reflection).toEqual({
      good: "Ich habe eine kleine Sache geschafft.",
      challenging: "Der Morgen war schwer.",
      grateful: "Tee.",
      tomorrow: "Langsam starten.",
      updatedAt: "2026-07-28T20:00:00.000Z",
    });
  });

  it("reads all journal days sorted by date", () => {
    saveDayReflection(
      { good: "Später Tag", challenging: "", grateful: "", tomorrow: "" },
      "2026-07-29",
      "2026-07-29T20:00:00.000Z",
    );
    appendDayJournalEvent(
      { type: "hp-check", state: hpState },
      "2026-07-28",
      "2026-07-28T07:00:00.000Z",
    );

    expect(readAllDayJournals().map((day) => day.date)).toEqual(["2026-07-28", "2026-07-29"]);
  });

  it("recovers from broken local journal data", () => {
    localStorage.setItem(DAY_JOURNAL_KEY, "no-json");

    expect(readDayJournal("2026-07-28")).toEqual({ date: "2026-07-28", events: [] });
    expect(localStorage.getItem(DAY_JOURNAL_KEY)).toBeNull();
  });
});
