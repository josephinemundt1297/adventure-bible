import { Link } from "@tanstack/react-router";
import { formatCalendarDay } from "../calendar.helpers";
import type { DayJournalEntry } from "../../../types/dayJournal";

interface DaySummaryProps {
  day: DayJournalEntry;
  hasContent: boolean;
  selectedDate: string;
}

export function DaySummary({ day, hasContent, selectedDate }: DaySummaryProps) {
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
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <Link to="/plan" className="btn btn-primary btn-sm min-h-9 rounded-xl px-3">Plan</Link>
          <Link to="/reflection" className="btn btn-outline btn-sm min-h-9 rounded-xl px-3">Reflexion</Link>
        </div>
      </div>
    </article>
  );
}
