import { Link } from "@tanstack/react-router";

const days = [
  { day: 27, weekday: "Mo", hasPlan: false },
  { day: 28, weekday: "Di", hasPlan: true },
  { day: 29, weekday: "Mi", hasPlan: false },
  { day: 30, weekday: "Do", hasPlan: false },
  { day: 1, weekday: "Fr", hasPlan: false },
  { day: 2, weekday: "Sa", hasPlan: false },
  { day: 3, weekday: "So", hasPlan: false },
];

export function CalendarView() {
  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-[2dvh]" aria-labelledby="calendar-heading">
      <header className="flex items-start justify-between gap-4 px-2 pt-1">
        <div>
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-primary">Dein Überblick</p>
          <h1 id="calendar-heading" className="mt-1 text-[clamp(1.5rem,6vw,1.9rem)] font-bold leading-tight tracking-tight text-primary">
            Juli 2026
          </h1>
          <p className="mt-1 text-sm text-base-content/65">Wähle einen Tag, um deinen Plan zu sehen.</p>
        </div>
        <span aria-hidden="true" className="text-2xl">📅</span>
      </header>

      <div className="rounded-3xl border border-primary/15 bg-base-100/70 p-[3vw] shadow-sm">
        <div className="mb-[2dvh] flex items-center justify-between">
          <button type="button" aria-label="Vorheriger Monat" disabled className="flex size-11 items-center justify-center rounded-xl text-lg disabled:opacity-30">
            ←
          </button>
          <p className="font-bold text-primary">Juli 2026</p>
          <button type="button" aria-label="Nächster Monat" className="flex size-11 items-center justify-center rounded-xl text-lg focus-visible:outline-2 focus-visible:outline-primary">
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-base-content/55" aria-hidden="true">
          {days.map(({ weekday }) => <span key={weekday}>{weekday}</span>)}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1">
          {days.map(({ day, weekday, hasPlan }) => (
            <Link
              key={`${weekday}-${day}`}
              to="/plan"
              aria-label={`${weekday}, ${day}. Juli 2026${hasPlan ? ", Plan vorhanden" : ""}`}
              className={`flex min-h-12 flex-col items-center justify-center rounded-xl text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-primary ${hasPlan ? "bg-primary text-primary-content shadow-sm" : "text-base-content/75 hover:bg-base-200"}`}
            >
              <span>{day}</span>
              {hasPlan && <span aria-hidden="true" className="mt-0.5 size-1.5 rounded-full bg-current" />}
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-primary/15 bg-base-100/60 p-[3vw]">
        <p className="text-xs font-semibold uppercase tracking-wide text-base-content/55">Ausgewählter Tag</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-primary">Dienstag, 28. Juli</h2>
            <p className="text-sm text-base-content/65">4 Aktivitäten · 2 erledigt</p>
          </div>
          <Link to="/plan" className="btn btn-primary min-h-11 rounded-xl px-4">
            Tagesplan
          </Link>
        </div>
      </div>
    </section>
  );
}
