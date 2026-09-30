import { describe, expect, it } from "vitest";
import { getCalendarWeekDays, getEventSummary, hasJournalContent } from "../src/features/calendar/calendar.helpers";
import type { DayJournalEntry, HpStateSnapshot } from "../src/types/dayJournal";
import type { Quest } from "../src/types/quest";

const hpState: HpStateSnapshot = {
  overall: 65,
  values: [
    { area: "Körper", value: 70 },
    { area: "Energie", value: 60 },
  ],
};

const quest: Quest = {
  id: "quest-1",
  title: "Wasser trinken",
  description: "Ein Glas Wasser trinken.",
  type: "recovery",
  effort: "low",
  rewardXp: 5,
  rewardQuestPoints: 1,
};

describe("calendar helpers", () => {
  it("builds a Monday based week around the selected date", () => {
    expect(getCalendarWeekDays("2026-07-30")).toEqual([
      { date: "2026-07-27", day: 27, weekday: "Mo" },
      { date: "2026-07-28", day: 28, weekday: "Di" },
      { date: "2026-07-29", day: 29, weekday: "Mi" },
      { date: "2026-07-30", day: 30, weekday: "Do" },
      { date: "2026-07-31", day: 31, weekday: "Fr" },
      { date: "2026-08-01", day: 1, weekday: "Sa" },
      { date: "2026-08-02", day: 2, weekday: "So" },
    ]);
  });

  it("summarizes journal events for the timeline", () => {
    expect(getEventSummary({ id: "1", type: "hp-check", createdAt: "2026-07-28T08:00:00.000Z", state: hpState })).toEqual({
      title: "Großer HP-Check",
      detail: "Gesamtzustand: 65/100",
    });

    expect(
      getEventSummary({
        id: "2",
        type: "quest-completed",
        createdAt: "2026-07-28T10:00:00.000Z",
        quest,
        rewardXp: 5,
        rewardQuestPoints: 1,
      }),
    ).toEqual({
      title: "Quest abgeschlossen",
      detail: "Wasser trinken · +5 XP · +1 Quest Point",
    });
  });

  it("detects journal content from events or reflection", () => {
    const emptyDay: DayJournalEntry = { date: "2026-07-28", events: [] };
    const eventDay: DayJournalEntry = {
      date: "2026-07-28",
      events: [{ id: "1", type: "campfire-started", createdAt: "2026-07-28T18:00:00.000Z" }],
    };
    const reflectionDay: DayJournalEntry = {
      date: "2026-07-28",
      events: [],
      reflection: { good: "Ruhe", challenging: "", grateful: "", tomorrow: "" },
    };

    expect(hasJournalContent(emptyDay)).toBe(false);
    expect(hasJournalContent(eventDay)).toBe(true);
    expect(hasJournalContent(reflectionDay)).toBe(true);
  });
});
