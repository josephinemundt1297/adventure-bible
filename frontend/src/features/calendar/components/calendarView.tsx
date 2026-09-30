import { useMemo, useState } from "react";
import { getJournalDate, readAllDayJournals, readDayJournal } from "../../../lib/dayJournal";
import { formatCalendarMonth, getCalendarWeekDays, hasJournalContent } from "../calendar.helpers";
import { DayJournalDetails } from "./dayJournalDetails";
import { DaySummary } from "./daySummary";
import { WeekSelector } from "./weekSelector";

export function CalendarView() {
  const today = getJournalDate();
  const [selectedDate, setSelectedDate] = useState(today);
  const allJournals = useMemo(() => readAllDayJournals(), []);
  const journalDates = new Set(allJournals.map((day) => day.date));
  const selectedDay = readDayJournal(selectedDate);
  const weekDays = getCalendarWeekDays(selectedDate);
  const hasSelectedContent = hasJournalContent(selectedDay);

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4" aria-labelledby="calendar-heading">
      <header className="flex items-start justify-between gap-4 px-2 pt-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Dein Überblick</p>
          <h1 id="calendar-heading" className="mt-1 text-2xl font-bold leading-tight tracking-tight text-primary">
            {formatCalendarMonth(selectedDate)}
          </h1>
          <p className="mt-1 text-sm text-base-content/65">
            Wähle einen Tag und schau dir an, was dort passiert ist.
          </p>
        </div>
        <span aria-hidden="true" className="text-2xl">📅</span>
      </header>

      <WeekSelector
        journalDates={journalDates}
        selectedDate={selectedDate}
        weekDays={weekDays}
        onSelectDate={setSelectedDate}
      />

      <DaySummary day={selectedDay} hasContent={hasSelectedContent} selectedDate={selectedDate} />

      {hasSelectedContent ? (
        <DayJournalDetails day={selectedDay} />
      ) : (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-100/60 p-4 text-center text-sm leading-5 text-base-content/65">
          Sobald du HP-Checks, Quests oder eine Reflexion machst, taucht dein Tagesverlauf hier auf.
        </div>
      )}
    </section>
  );
}
