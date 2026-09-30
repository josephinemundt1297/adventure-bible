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
    <article className="rounded-2xl border border-primary/15 bg-base-100/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-base-content/55">Ausgewählter Tag</p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-primary">{formatCalendarDay(selectedDate)}</h2>
          <p className="text-sm text-base-content/65">
            {hasContent
              ? `${day.events.length} Verlaufseinträge${day.reflection ? " · Reflexion gespeichert" : ""}`
              : "Noch kein Tagesjournal gespeichert."}
          </p>
        </div>
        <Link to="/plan" className="btn btn-primary min-h-11 rounded-xl px-4">
          Plan
        </Link>
      </div>
    </article>
  );
}
