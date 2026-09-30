import { getJournalDate } from "../../lib/dayJournal";
import { formatGermanDayWithMonth, formatGermanMonthWithYear, formatGermanTime } from "../../lib/dateFormat";
import type { DayJournalEntry, DayJournalEvent } from "../../types/dayJournal";

const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] as const;

export function getCalendarWeekDays(selectedDate: string) {
  const date = new Date(`${selectedDate}T12:00:00`);
  const day = date.getDay() === 0 ? 7 : date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - day + 1);

  // Kleine Wochenansicht reicht fürs MVP und hält den Kalender ruhig.
  return weekdays.map((weekday, index) => {
    const current = new Date(monday);
    current.setDate(monday.getDate() + index);

    return {
      date: getJournalDate(current),
      day: current.getDate(),
      weekday,
    };
  });
}

export function formatCalendarDay(date: string) {
  return formatGermanDayWithMonth(new Date(`${date}T12:00:00`));
}

export function formatCalendarMonth(date: string) {
  return formatGermanMonthWithYear(new Date(`${date}T12:00:00`));
}

export function formatJournalTime(date: string) {
  return formatGermanTime(new Date(date));
}

export function getEventSummary(event: DayJournalEvent) {
  switch (event.type) {
    case "hp-check":
      return {
        title: "Großer HP-Check",
        detail: `Gesamtzustand: ${event.state.overall}/100`,
      };
    case "quest-started":
      return {
        title: "Quest gestartet",
        detail: event.quest.title,
      };
    case "quest-completed":
      return {
        title: "Quest abgeschlossen",
        detail: `${event.quest.title} · +${event.rewardXp} XP · +${event.rewardQuestPoints} Quest Point`,
      };
    case "mini-hp-check":
      return {
        title: "Mini HP-Check",
        detail: event.state.values.map(({ area, value }) => `${area}: ${value}`).join(" · "),
      };
    case "campfire-started":
      return {
        title: "Lagerfeuer",
        detail: "Regeneration bewusst gewählt.",
      };
  }
}

export function hasJournalContent(day: DayJournalEntry) {
  return day.events.length > 0 || Boolean(day.reflection);
}
