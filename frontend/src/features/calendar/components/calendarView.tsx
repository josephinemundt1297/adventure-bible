import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import {
  listBackendPlanActivities,
  mapBackendPlanActivity,
} from "../../../lib/backendPlanActivities";
import { getJournalDate, readAllDayJournals, readDayJournal } from "../../../lib/dayJournal";
import type { PlannedActivity } from "../../../types/plan";
import { formatCalendarMonth, getCalendarWeekDays, hasJournalContent } from "../calendar.helpers";
import { DayJournalDetails } from "./dayJournalDetails";
import { DaySummary } from "./daySummary";
import { WeekSelector } from "./weekSelector";

export function CalendarView() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const today = getJournalDate();
  const [selectedDate, setSelectedDate] = useState(today);
  const [planActivities, setPlanActivities] = useState<PlannedActivity[]>([]);
  const [planLoadWarning, setPlanLoadWarning] = useState("");
  const allJournals = useMemo(() => readAllDayJournals(), []);
  const journalDates = new Set(allJournals.map((day) => day.date));
  const selectedDay = readDayJournal(selectedDate);
  const weekDays = getCalendarWeekDays(selectedDate);
  const hasSelectedContent = hasJournalContent(selectedDay);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    let didCancel = false;

    async function loadPlanActivities() {
      try {
        const response = await listBackendPlanActivities({
          activityDate: selectedDate,
          getToken,
        });

        if (didCancel) return;

        setPlanActivities(
          response.data
            .map(mapBackendPlanActivity)
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
        );
        setPlanLoadWarning("");
      } catch {
        if (!didCancel) {
          setPlanActivities([]);
          setPlanLoadWarning(
            "Planpunkte konnten gerade nicht aus dem Backend geladen werden.",
          );
        }
      }
    }

    void loadPlanActivities();

    return () => {
      didCancel = true;
    };
  }, [getToken, isLoaded, isSignedIn, selectedDate]);

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4" aria-labelledby="calendar-heading">
      <header className="adventure-card rounded-2xl border border-primary/15 p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="app-kicker text-xs font-bold uppercase">Tagesjournal</p>
            <h1 id="calendar-heading" className="app-heading mt-1 text-2xl font-bold leading-tight tracking-tight text-primary">
              {formatCalendarMonth(selectedDate)}
            </h1>
            <p className="mt-1 text-sm leading-5 text-base-content/65">
              HP-Checks, Quests und Reflexionen werden hier als Tagesverlauf sichtbar.
            </p>
          </div>
          <span aria-hidden="true" className="rounded-2xl bg-primary/10 px-3 py-2 text-2xl">📅</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-base-100/70 p-2">
            <p className="text-lg font-bold text-primary">{allJournals.length}</p>
            <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-base-content/55">Tage</p>
          </div>
          <div className="rounded-xl bg-base-100/70 p-2">
            <p className="text-lg font-bold text-primary">{planActivities.length}</p>
            <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-base-content/55">Plan</p>
          </div>
          <div className="rounded-xl bg-base-100/70 p-2">
            <p className="text-lg font-bold text-primary">{selectedDay.reflection ? "Ja" : "Nein"}</p>
            <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-base-content/55">Reflexion</p>
          </div>
        </div>
      </header>

      {!selectedDay.reflection ? (
        <Link
          to="/reflection"
          className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-left text-primary shadow-sm transition-colors hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span>
            <span className="block text-sm font-bold">🌙 Abendliche Reflexion fehlt noch</span>
            <span className="mt-0.5 block text-xs text-base-content/65">Ein kurzer Rückblick macht den Tag später leichter lesbar.</span>
          </span>
          <span aria-hidden="true" className="text-xl">→</span>
        </Link>
      ) : null}

      {planLoadWarning ? (
        <p className="rounded-2xl bg-warning/20 px-4 py-3 text-sm font-semibold leading-5 text-base-content">
          {planLoadWarning}
        </p>
      ) : null}

      <div className="px-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-base-content/55">Woche auswählen</p>
        </div>
      </div>

      <WeekSelector
        journalDates={journalDates}
        selectedDate={selectedDate}
        weekDays={weekDays}
        onSelectDate={setSelectedDate}
      />

      <DaySummary
        day={selectedDay}
        hasContent={hasSelectedContent}
        planActivities={planActivities}
        selectedDate={selectedDate}
      />

      {hasSelectedContent || planActivities.length > 0 ? (
        <DayJournalDetails day={selectedDay} planActivities={planActivities} />
      ) : (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-100/60 p-4 text-center text-sm leading-5 text-base-content/65">
          Sobald du HP-Checks, Quests oder eine Reflexion machst, taucht dein Tagesverlauf hier auf.
        </div>
      )}
    </section>
  );
}
