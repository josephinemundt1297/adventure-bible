import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { quests } from "../../../data/quests";
import { selectMiniQuest } from "../../../lib/miniQuestSelection";
import type { MiniHpArea, MiniHpState } from "../../../types/miniHp";
import type { Quest } from "../../../types/quest";

const MINI_HP_STATE_KEY = "adventure-bible:mini-hp-state";
const MINI_SELECTED_QUEST_KEY = "adventure-bible:mini-selected-quest";

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
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);

  function updateValue(area: MiniHpArea, value: number) {
    setSavedState(null);
    setSelectedQuestId(null);
    setValues((current) => ({ ...current, [area]: value }));
  }

  function saveCheck() {
    const state: MiniHpState = {
      values: areas.map(({ id }) => ({ area: id, value: values[id] })),
      completedAt: new Date().toISOString(),
    };

    sessionStorage.setItem(MINI_HP_STATE_KEY, JSON.stringify(state));
    sessionStorage.removeItem(MINI_SELECTED_QUEST_KEY);
    setSelectedQuestId(null);
    setSavedState(state);
  }

  function chooseQuest(quest: Quest) {
    sessionStorage.setItem(MINI_SELECTED_QUEST_KEY, quest.id);
    setSelectedQuestId(quest.id);
  }

  const recommendations = savedState ? selectMiniQuest(savedState, quests) : null;
  const primary = recommendations?.primary ?? null;
  const alternative = recommendations?.alternative ?? null;
  const selectedQuest = [primary, alternative].find((quest) => quest?.id === selectedQuestId) ?? null;

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

          {primary && (
            <article className={`card border shadow-sm ${selectedQuestId === primary.id ? "border-primary bg-primary/10" : "border-primary/30 bg-primary/5"}`}>
              <div className="card-body gap-3 p-4">
                <span className="badge badge-primary w-fit">Vorschlag</span>
                <h3 className="text-lg font-bold">{primary.title}</h3>
                <p className="text-sm leading-6 text-base-content/70">{primary.description}</p>
                <span className="text-sm font-semibold text-primary">+{primary.rewardXp} XP</span>
                <button type="button" className="btn btn-primary min-h-11 w-full" onClick={() => chooseQuest(primary)} aria-pressed={selectedQuestId === primary.id}>
                  {selectedQuestId === primary.id ? "Ausgewählt ✓" : "Diese Aufgabe wählen"}
                </button>
              </div>
            </article>
          )}

          {alternative && (
            <article className={`card border shadow-sm ${selectedQuestId === alternative.id ? "border-primary bg-primary/10" : "border-base-300 bg-base-100"}`}>
              <div className="card-body gap-3 p-4">
                <span className="badge badge-ghost w-fit">Alternative</span>
                <h3 className="text-lg font-bold">{alternative.title}</h3>
                <p className="text-sm leading-6 text-base-content/70">{alternative.description}</p>
                <span className="text-sm font-semibold text-base-content/70">+{alternative.rewardXp} XP</span>
                <button type="button" className="btn btn-outline min-h-11 w-full" onClick={() => chooseQuest(alternative)} aria-pressed={selectedQuestId === alternative.id}>
                  {selectedQuestId === alternative.id ? "Ausgewählt ✓" : "Alternative wählen"}
                </button>
              </div>
            </article>
          )}

          {selectedQuest && (
            <div className="space-y-2 pt-2">
              <p className="text-center text-sm font-medium" role="status">
                „{selectedQuest.title}“ ist ausgewählt.
              </p>
              <Link to="/quests" className="btn btn-primary min-h-11 w-full">
                Aufgabe starten
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
