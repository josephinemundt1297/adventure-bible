import { formatJournalTime, getEventSummary } from "../calendar.helpers";
import type { DayJournalEntry } from "../../../types/dayJournal";

interface DayJournalDetailsProps {
  day: DayJournalEntry;
}

const reflectionTextClass = "mt-1 break-words text-base-content/70";

export function DayJournalDetails({ day }: DayJournalDetailsProps) {
  return (
    <section className="flex flex-col gap-3" aria-labelledby="day-journal-heading">
      <h2 id="day-journal-heading" className="px-1 text-sm font-bold uppercase tracking-wide text-primary">
        Tagesverlauf
      </h2>

      {day.events.length > 0 ? (
        <ol className="flex flex-col gap-2">
          {day.events.map((event) => {
            const summary = getEventSummary(event);

            return (
              <li key={event.id} className="rounded-2xl border border-base-300/70 bg-base-100/70 p-3 shadow-sm">
                <p className="text-xs font-semibold text-base-content/55">{formatJournalTime(event.createdAt)}</p>
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

      {day.reflection && (
        <section className="rounded-2xl border border-primary/20 bg-base-100/70 p-4 shadow-sm" aria-labelledby="reflection-summary-heading">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Abendliche Reflexion</p>
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
