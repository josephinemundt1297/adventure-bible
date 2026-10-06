import { Link } from "@tanstack/react-router";
import { formatCalendarDay } from "../calendar.helpers";
import type { DayJournalEntry } from "../../../types/dayJournal";
import type { PlannedActivity } from "../../../types/plan";

interface DaySummaryProps {
  day: DayJournalEntry;
  hasContent: boolean;
  planActivities: PlannedActivity[];
  selectedDate: string;
}

export function DaySummary({ day, hasContent, planActivities, selectedDate }: DaySummaryProps) {
  const completedActivities = planActivities.filter((activity) => activity.completed).length;

  return (
    <article className="rounded-2xl border border-primary/20 bg-base-100/80 p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Ausgewählter Tag</p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <div>
          <h2 className="app-heading text-xl font-bold text-primary">{formatCalendarDay(selectedDate)}</h2>
          <p className="text-sm text-base-content/65">
            {hasContent
              ? `${day.events.length} Verlaufseinträge${day.reflection ? " · Reflexion gespeichert" : ""}`
              : "Noch kein Tagesjournal gespeichert."}
          </p>
          {planActivities.length > 0 ? (
            <p className="mt-1 text-xs font-semibold text-primary">
              {completedActivities} von {planActivities.length} Planpunkten erledigt
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <Link to="/plan" className="btn btn-primary min-h-11 rounded-xl px-3 text-xs">Plan</Link>
          <Link to="/reflection" className="btn btn-outline min-h-11 rounded-xl px-3 text-xs">Reflexion</Link>
        </div>
      </div>
    </article>
  );
}
