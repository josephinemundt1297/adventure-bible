import { useState } from "react";
import { quests } from "../../../data/quests";
import { selectMiniQuest } from "../../../lib/miniQuestSelection";
import type { MiniHpArea, MiniHpState } from "../../../types/miniHp";

const MINI_HP_STATE_KEY = "adventure-bible:mini-hp-state";

const areas: Array<{
  id: MiniHpArea;
  label: string;
  icon: string;
}> = [
  { id: "energy", label: "Energie", icon: "⚡" },
  { id: "focus", label: "Fokus", icon: "🎯" },
  { id: "mood", label: "Stimmung", icon: "🙂" },
  { id: "body", label: "Körper", icon: "❤️" },
];

const initialValues: Record<MiniHpArea, number> = {
  energy: 50,
  focus: 50,
  mood: 50,
  body: 50,
};

export function MiniHpCheck() {
  const [values, setValues] = useState(initialValues);
  const [savedState, setSavedState] = useState<MiniHpState | null>(null);

  function updateValue(area: MiniHpArea, value: number) {
    setSavedState(null);
    setValues((current) => ({ ...current, [area]: value }));
  }

  function saveCheck() {
    const state: MiniHpState = {
      values: areas.map(({ id }) => ({ area: id, value: values[id] })),
      completedAt: new Date().toISOString(),
    };

    sessionStorage.setItem(MINI_HP_STATE_KEY, JSON.stringify(state));
    setSavedState(state);
  }

  const recommendations = savedState ? selectMiniQuest(savedState, quests) : null;

  return (
    <section className="space-y-6" aria-labelledby="mini-hp-heading">
      <header className="space-y-2 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Schneller HP-Check</p>
        <h1 id="mini-hp-heading" className="text-2xl font-bold tracking-tight">
          Wie geht es dir gerade?
        </h1>
        <p className="text-sm leading-6 text-base-content/70">
          Ein kurzer Check genügt. Danach schlägt dir die App eine passende Aufgabe vor – plus eine Alternative.
        </p>
      </header>

      <div className="space-y-6" aria-label="Aktuellen Zustand einschätzen">
        {areas.map(({ id, label, icon }) => (
          <div key={id} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`mini-hp-${id}`} className="font-medium">
                <span aria-hidden="true" className="mr-2">
                  {icon}
                </span>
                {label}
              </label>
              <output htmlFor={`mini-hp-${id}`} className="min-w-12 text-right text-sm font-semibold">
                {values[id]}/100
              </output>
            </div>

            <input
              id={`mini-hp-${id}`}
              type="range"
              min="0"
              max="100"
              step="1"
              value={values[id]}
              onChange={(event) => updateValue(id, Number(event.target.value))}
              className="range range-primary w-full"
              aria-label={`${label}: ${values[id]} von 100`}
            />
          </div>
        ))}
      </div>

      <button type="button" className="btn btn-primary w-full" onClick={saveCheck}>
        Aufgabe vorschlagen
      </button>

      {recommendations && (
        <div className="space-y-3" aria-labelledby="mini-hp-recommendation-heading" aria-live="polite">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Deine Empfehlung</p>
            <h2 id="mini-hp-recommendation-heading" className="mt-1 text-lg font-bold">
              Was passt gerade zu dir?
            </h2>
          </div>

          {recommendations.primary && (
            <article className="card border border-primary/30 bg-primary/5 shadow-sm">
              <div className="card-body gap-3 p-4">
                <span className="badge badge-primary w-fit">Vorschlag</span>
                <h3 className="text-lg font-bold">{recommendations.primary.title}</h3>
                <p className="text-sm leading-6 text-base-content/70">{recommendations.primary.description}</p>
                <span className="text-sm font-semibold text-primary">+{recommendations.primary.rewardXp} XP</span>
              </div>
            </article>
          )}

          {recommendations.alternative && (
            <article className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body gap-3 p-4">
                <span className="badge badge-ghost w-fit">Alternative</span>
                <h3 className="text-lg font-bold">{recommendations.alternative.title}</h3>
                <p className="text-sm leading-6 text-base-content/70">{recommendations.alternative.description}</p>
                <span className="text-sm font-semibold text-base-content/70">+{recommendations.alternative.rewardXp} XP</span>
              </div>
            </article>
          )}
        </div>
      )}
    </section>
  );
}
