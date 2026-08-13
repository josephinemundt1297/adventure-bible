import { quests } from "../../../data/quests";
import { selectQuest } from "../../../lib/questSelection";
import type { HpState } from "../../../types/hp";

interface QuestRecommendationProps {
  state: HpState;
}

export function QuestRecommendation({ state }: QuestRecommendationProps) {
  const quest = selectQuest(state, quests);

  if (!quest) {
    return <p>Aktuell ist keine Quest verfügbar.</p>;
  }

  return (
    <section className="space-y-5" aria-labelledby="quest-heading">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Deine nächste Quest</p>
        <h1 id="quest-heading" className="text-2xl font-bold tracking-tight">Eine passende Aufgabe wartet auf dich.</h1>
        <p className="text-sm leading-6 text-base-content/70">
          Deine Empfehlung orientiert sich an dem Bereich, der gerade am meisten Unterstützung gebrauchen kann.
        </p>
      </header>

      <article className="card border border-primary/20 bg-base-100 shadow-sm">
        <div className="card-body gap-4">
          <div className="flex items-center justify-between gap-3">
            <span className="badge badge-primary">{quest.type === "recovery" ? "Recovery Quest" : "Side Quest"}</span>
            <span className="text-sm font-semibold text-primary">+{quest.rewardXp} XP</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{quest.title}</h2>
            <p className="mt-2 text-sm leading-6 text-base-content/70">{quest.description}</p>
          </div>
          <div className="flex items-center justify-between text-sm text-base-content/60">
            <span>Aufwand: {quest.effort === "short" ? "kurz" : "mittel"}</span>
            <span>Empfohlen für dich</span>
          </div>
          <button type="button" className="btn btn-primary w-full">
            Quest starten
          </button>
        </div>
      </article>
    </section>
  );
}
