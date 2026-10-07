import { useState } from "react";
import { formatJournalTime, getEventSummary } from "../calendar.helpers";
import type { DayJournalEntry } from "../../../types/dayJournal";
import type { PlannedActivity } from "../../../types/plan";

interface DayJournalDetailsProps {
  day: DayJournalEntry;
  planActivities: PlannedActivity[];
}

const reflectionTextClass = "mt-1 break-words text-base-content/70";

export function DayJournalDetails({ day, planActivities }: DayJournalDetailsProps) {
  const [journalOpen, setJournalOpen] = useState(true);
  const [planOpen, setPlanOpen] = useState(false);

  return (
    <section className="flex flex-col gap-3" aria-labelledby="day-journal-heading">
      <details
        className="rounded-2xl border border-base-300 bg-base-100/80 shadow-sm"
        open={journalOpen}
        onToggle={(event) => setJournalOpen(event.currentTarget.open)}
      >
        <summary className="flex min-h-12 cursor-pointer flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
          <span className="min-w-0">
            <span id="day-journal-heading" className="text-sm font-bold uppercase tracking-wide text-primary">
              Tagesverlauf
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[0.7rem] font-bold leading-none text-primary">
            {day.events.length} Ereignisse
          </span>
        </summary>

        <div className="border-t border-base-300 px-3 py-3">
          {day.events.length > 0 ? (
            <ol className="flex flex-col gap-2">
              {day.events.map((event) => {
                const summary = getEventSummary(event);

                return (
                  <li key={event.id} className="rounded-2xl border border-base-300/70 bg-base-100/80 p-3 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg">
                        {summary.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-base-content/55">{formatJournalTime(event.createdAt)}</p>
                        <h3 className="mt-1 font-bold">{summary.title}</h3>
                        <p className="mt-1 break-words text-sm leading-5 text-base-content/70">{summary.detail}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="rounded-2xl border border-base-300/70 bg-base-100/70 p-3 text-sm text-base-content/65">
              Für diesen Tag gibt es noch keine HP- oder Quest-Einträge.
            </p>
          )}
        </div>
      </details>

      {planActivities.length > 0 ? (
        <details
          className="rounded-2xl border border-primary/20 bg-base-100/80 shadow-sm"
          open={planOpen}
          onToggle={(event) => setPlanOpen(event.currentTarget.open)}
        >
          <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-3 px-4 py-3">
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-primary">Tagesplan</span>
              <span id="planned-activities-heading" className="mt-0.5 block font-bold">Geplante Punkte</span>
            </span>
            <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[0.7rem] font-bold leading-none text-primary">
              {planActivities.length}
            </span>
          </summary>
          <ol className="flex flex-col gap-2 border-t border-base-300 px-3 py-3">
            {planActivities.map((activity) => (
              <li key={activity.id} className="flex items-center gap-3 rounded-xl bg-primary/8 px-3 py-2">
                <span aria-hidden="true" className="text-lg">{activity.type === "quest" ? "🎯" : "🧳"}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-base-content/55">{activity.time}</p>
                  <p className={`text-sm font-bold ${activity.completed ? "text-base-content/50 line-through" : ""}`}>
                    {activity.title}
                  </p>
                </div>
                <span className={`rounded-full px-2 py-1 text-[0.7rem] font-bold ${activity.completed ? "bg-success/15 text-base-content" : "bg-base-200 text-base-content/60"}`}>
                  {activity.completed ? "fertig" : "offen"}
                </span>
              </li>
            ))}
          </ol>
        </details>
      ) : null}

      {day.reflection && (
        <section className="rounded-2xl border border-primary/25 bg-primary/8 p-4 shadow-sm" aria-labelledby="reflection-summary-heading">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">🌙 Abendliche Reflexion</p>
          <h3 id="reflection-summary-heading" className="mt-1 font-bold">
            Dein Tagebuch-Eintrag
          </h3>
          <dl className="mt-3 flex flex-col gap-3 text-sm">
            <div>
              <dt className="font-semibold">Was war gut?</dt>
              <dd className={reflectionTextClass}>{day.reflection.good || "Nicht ausgefüllt."}</dd>
            </div>
            <div>
              <dt className="font-semibold">Was war herausfordernd?</dt>
              <dd className={reflectionTextClass}>{day.reflection.challenging || "Nicht ausgefüllt."}</dd>
            </div>
            <div>
              <dt className="font-semibold">Wofür bist du dankbar?</dt>
              <dd className={reflectionTextClass}>{day.reflection.grateful || "Nicht ausgefüllt."}</dd>
            </div>
            <div>
              <dt className="font-semibold">Notiz für morgen</dt>
              <dd className={reflectionTextClass}>{day.reflection.tomorrow || "Nicht ausgefüllt."}</dd>
            </div>
          </dl>
        </section>
      )}
    </section>
  );
}
