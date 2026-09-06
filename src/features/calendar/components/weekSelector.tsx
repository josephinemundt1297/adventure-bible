import { formatCalendarMonth } from "../calendar.helpers";

interface WeekDay {
  date: string;
  day: number;
  weekday: string;
}

interface WeekSelectorProps {
  journalDates: Set<string>;
  selectedDate: string;
  weekDays: WeekDay[];
  onSelectDate: (date: string) => void;
}

export function WeekSelector({ journalDates, selectedDate, weekDays, onSelectDate }: WeekSelectorProps) {
  return (
    <div className="rounded-3xl border border-primary/15 bg-base-100/70 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <button type="button" aria-label="Vorherige Woche" disabled className="flex size-11 items-center justify-center rounded-xl text-lg disabled:opacity-30">
          ←
        </button>
        <p className="font-bold text-primary">{formatCalendarMonth(selectedDate)}</p>
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
              onClick={() => onSelectDate(date)}
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
  );
}
