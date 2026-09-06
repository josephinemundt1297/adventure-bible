import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getJournalDate, readAllDayJournals, readDayJournal } from "../../../lib/dayJournal";
import type { DayJournalEntry, DayJournalEvent } from "../../../types/dayJournal";

const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] as const;

function getWeekDays(selectedDate: string) {
  const date = new Date(`${selectedDate}T12:00:00`);
  const day = date.getDay() === 0 ? 7 : date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - day + 1);

  // Erstmal bewusst eine kleine Woche: reicht fürs MVP-Journal und bleibt ruhig.
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date(`${date}T12:00:00`));
}

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function getEventSummary(event: DayJournalEvent) {
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

function hasJournalContent(day: DayJournalEntry) {
  return day.events.length > 0 || Boolean(day.reflection);
}

export function CalendarView() {
  const today = getJournalDate();
  const [selectedDate, setSelectedDate] = useState(today);
  const allJournals = useMemo(() => readAllDayJournals(), []);
  const journalDates = new Set(allJournals.map((day) => day.date));
  const selectedDay = readDayJournal(selectedDate);
  const weekDays = getWeekDays(selectedDate);
  const hasSelectedContent = hasJournalContent(selectedDay);

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4" aria-labelledby="calendar-heading">
      <header className="flex items-start justify-between gap-4 px-2 pt-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Dein Überblick</p>
          <h1 id="calendar-heading" className="mt-1 text-2xl font-bold leading-tight tracking-tight text-primary">
            {formatMonth(selectedDate)}
          </h1>
          <p className="mt-1 text-sm text-base-content/65">
            Wähle einen Tag und schau dir an, was dort passiert ist.
          </p>
        </div>
        <span aria-hidden="true" className="text-2xl">📅</span>
      </header>

      <div className="rounded-3xl border border-primary/15 bg-base-100/70 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <button type="button" aria-label="Vorherige Woche" disabled className="flex size-11 items-center justify-center rounded-xl text-lg disabled:opacity-30">
            ←
          </button>
          <p className="font-bold text-primary">{formatMonth(selectedDate)}</p>
          <button type="button" aria-label="Nächste Woche" disabled className="flex size-11 items-center justify-center rounded-xl text-lg disabled:opacity-30">
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-base-content/55" aria-hidden="true">
          {weekDays.map(({ weekday }) => <span key={weekday}>{weekday}</span>)}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1">
          {weekDays.map(({ date, day, weekday }) => {
            const hasEntry = journalDates.has(date);
            const selected = date === selectedDate;

            return (
              <button
                key={date}
                type="button"
                aria-pressed={selected}
                aria-label={`${weekday}, ${day}. ${hasEntry ? "Tagebuch vorhanden" : "kein Tagebuch vorhanden"}`}
                onClick={() => setSelectedDate(date)}
                className={`flex min-h-12 flex-col items-center justify-center rounded-xl text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                  selected ? "bg-primary text-primary-content shadow-sm" : "text-base-content/75 hover:bg-base-200"
                }`}
              >
                <span>{day}</span>
                {hasEntry && <span aria-hidden="true" className="mt-0.5 size-1.5 rounded-full bg-current" />}
              </button>
            );
          })}
        </div>
      </div>

      <article className="rounded-2xl border border-primary/15 bg-base-100/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-base-content/55">Ausgewählter Tag</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-primary">{formatDate(selectedDate)}</h2>
            <p className="text-sm text-base-content/65">
              {hasSelectedContent
                ? `${selectedDay.events.length} Verlaufseinträge${selectedDay.reflection ? " · Reflexion gespeichert" : ""}`
                : "Noch kein Tagesjournal gespeichert."}
            </p>
          </div>
          <Link to="/plan" className="btn btn-primary min-h-11 rounded-xl px-4">
            Plan
          </Link>
        </div>
      </article>

      {hasSelectedContent ? (
        <section className="flex flex-col gap-3" aria-labelledby="day-journal-heading">
          <h2 id="day-journal-heading" className="px-1 text-sm font-bold uppercase tracking-wide text-primary">
            Tagesverlauf
          </h2>

          {selectedDay.events.length > 0 ? (
            <ol className="flex flex-col gap-2">
              {selectedDay.events.map((event) => {
                const summary = getEventSummary(event);

                return (
                  <li key={event.id} className="rounded-2xl border border-base-300/70 bg-base-100/70 p-3 shadow-sm">
                    <p className="text-xs font-semibold text-base-content/55">{formatTime(event.createdAt)}</p>
                    <h3 className="mt-1 font-bold">{summary.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-base-content/70">{summary.detail}</p>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="rounded-2xl border border-base-300/70 bg-base-100/70 p-3 text-sm text-base-content/65">
              Für diesen Tag gibt es noch keine HP- oder Quest-Einträge.
            </p>
          )}

          {selectedDay.reflection && (
            <section className="rounded-2xl border border-primary/20 bg-base-100/70 p-4 shadow-sm" aria-labelledby="reflection-summary-heading">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Abendliche Reflexion</p>
              <h3 id="reflection-summary-heading" className="mt-1 font-bold">
                Dein Tagebuch-Eintrag
              </h3>
              <dl className="mt-3 flex flex-col gap-3 text-sm">
                <div>
                  <dt className="font-semibold">Was war gut?</dt>
                  <dd className="mt-1 text-base-content/70">{selectedDay.reflection.good || "Nicht ausgefüllt."}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Was war herausfordernd?</dt>
                  <dd className="mt-1 text-base-content/70">{selectedDay.reflection.challenging || "Nicht ausgefüllt."}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Wofür bist du dankbar?</dt>
                  <dd className="mt-1 text-base-content/70">{selectedDay.reflection.grateful || "Nicht ausgefüllt."}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Notiz für morgen</dt>
                  <dd className="mt-1 text-base-content/70">{selectedDay.reflection.tomorrow || "Nicht ausgefüllt."}</dd>
                </div>
              </dl>
            </section>
          )}
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-100/60 p-4 text-center text-sm leading-5 text-base-content/65">
          Sobald du HP-Checks, Quests oder eine Reflexion machst, taucht dein Tagesverlauf hier auf.
        </div>
      )}
    </section>
  );
}
