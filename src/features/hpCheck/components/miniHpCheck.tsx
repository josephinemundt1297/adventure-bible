import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { quests } from "../../../data/quests";
import { notifyAchievements } from "../../../lib/rewardNotifications";
import { recordMiniHpCheck } from "../../../lib/achievements";
import { readCompletedQuestIds } from "../../../lib/questHistory";
import { selectMiniQuest } from "../../../lib/miniQuestSelection";
import { leaveCampfire, startCampfire } from "../../../lib/campfire";
import type { MiniHpArea, MiniHpState } from "../../../types/miniHp";
import type { Quest } from "../../../types/quest";
import type { HpState } from "../../../types/hp";

const MINI_HP_STATE_KEY = "adventure-bible:mini-hp-state";
const HP_STATE_KEY = "adventure-bible:hp-state";
const MINI_SELECTED_QUEST_KEY = "adventure-bible:mini-selected-quest";
const areas: Array<{ id: MiniHpArea; label: string; icon: string }> = [
  { id: "energy", label: "Energie", icon: "⚡" },
  { id: "focus", label: "Fokus", icon: "🎯" },
  { id: "mood", label: "Stimmung", icon: "🙂" },
  { id: "body", label: "Körper", icon: "❤️" },
];
const initialValues: Record<MiniHpArea, number> = { energy: 50, focus: 50, mood: 50, body: 50 };

function readPreviousHpState(): HpState | null {
  const stored = sessionStorage.getItem(HP_STATE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as HpState;
  } catch {
    return null;
  }
}

export function MiniHpCheck() {
  const [values, setValues] = useState(initialValues);
  const [savedState, setSavedState] = useState<MiniHpState | null>(null);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [campfireStarted, setCampfireStarted] = useState(false);

  function updateValue(area: MiniHpArea, value: number) {
    setSavedState(null);
    setSelectedQuestId(null);
    setCampfireStarted(false);
    setValues((current) => ({ ...current, [area]: value }));
  }

  function saveCheck() {
    const state: MiniHpState = {
      values: areas.map(({ id }) => ({ area: id, value: values[id] })),
      completedAt: new Date().toISOString(),
    };
    leaveCampfire();
    sessionStorage.setItem(MINI_HP_STATE_KEY, JSON.stringify(state));
    sessionStorage.removeItem(MINI_SELECTED_QUEST_KEY);
    notifyAchievements(recordMiniHpCheck());
    setSelectedQuestId(null);
    setCampfireStarted(false);
    setSavedState(state);
  }

  function chooseQuest(quest: Quest) {
    leaveCampfire();
    sessionStorage.setItem(MINI_SELECTED_QUEST_KEY, quest.id);
    setCampfireStarted(false);
    setSelectedQuestId(quest.id);
  }

  function chooseCampfire() {
    startCampfire();
    sessionStorage.removeItem(MINI_SELECTED_QUEST_KEY);
    setSelectedQuestId(null);
    setCampfireStarted(true);
  }

  const recommendations = savedState
    ? selectMiniQuest(savedState, quests, readCompletedQuestIds())
    : null;
  const primary = recommendations?.primary ?? null;
  const alternative = recommendations?.alternative ?? null;
  const selectedQuest = [primary, alternative].find((quest) => quest?.id === selectedQuestId) ?? null;
  const previousHpState = readPreviousHpState();
  const previousValues = new Map(
    previousHpState?.areas.map((area) => [area.area, area.score]) ?? [],
  );

  if (campfireStarted) {
    return (
      <section className="mx-auto flex w-full max-w-md flex-col gap-4 text-center" aria-labelledby="campfire-heading">
        <header className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">Lagerfeuer</p>
          <h1 id="campfire-heading" className="text-2xl font-bold tracking-tight">Du darfst jetzt einfach ruhen. 🔥</h1>
          <p className="text-sm leading-5 text-base-content/65">
            Regeneration ist ein Teil deines Abenteuers. Es gibt gerade nichts zu beweisen und nichts nachzuholen.
          </p>
        </header>

        <div className="card border border-primary/20 bg-base-100 shadow-sm" role="status">
          <div className="card-body items-center gap-3 py-8">
            <div className="flex size-20 items-center justify-center rounded-full bg-base-200 text-5xl" aria-hidden="true">🔥</div>
            <h2 className="text-lg font-bold">Lagerfeuer entzündet</h2>
            <p className="max-w-xs text-sm leading-5 text-base-content/65">
              Nimm dir die Zeit, die du brauchst. Wenn du bereit bist, kannst du einen neuen Abenteuerzyklus beginnen.
            </p>
          </div>
        </div>

        <Link
          to="/hp-check"
          onClick={leaveCampfire}
          className="btn btn-primary min-h-11 w-full"
        >
          Neuen Abenteuerzyklus starten
        </Link>
      </section>
    );
  }

  if (savedState && recommendations) {
    return (
      <section className="mx-auto flex w-full max-w-md flex-col gap-3" aria-labelledby="mini-hp-recommendation-heading">
        <header className="space-y-1 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">Check abgeschlossen</p>
          <h1 id="mini-hp-recommendation-heading" className="text-xl font-bold tracking-tight">Was passt gerade zu dir?</h1>
          <p className="text-xs leading-4 text-base-content/65">Dein Check ist gespeichert. Wähle eine Aufgabe – oder gönn dir das Lagerfeuer.</p>
        </header>

        <div className="grid grid-cols-4 gap-1.5" aria-label="Deine aktuellen Werte">
          {areas.map(({ id, label, icon }) => {
            const previous = previousValues.get(id);
            return (
              <div key={id} className="rounded-xl border border-base-300/70 bg-base-100/70 px-1.5 py-1.5 text-center">
                <span className="text-xs" aria-hidden="true">{icon}</span>
                <p className="text-[10px] font-semibold text-base-content/60">{label}</p>
                <p className="text-xs font-bold">{values[id]}</p>
                {previous !== undefined && <p className="text-[9px] text-base-content/45">vorher {previous}</p>}
              </div>
            );
          })}
        </div>

        <div className="grid gap-2">
          {primary && (
            <article className={`rounded-2xl border p-3 shadow-sm ${selectedQuestId === primary.id ? "border-primary bg-primary/10" : "border-primary/30 bg-primary/5"}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="badge badge-primary badge-sm">Vorschlag</span>
                <span className="text-xs font-bold text-primary">+{primary.rewardXp} XP</span>
              </div>
              <h2 className="mt-1 text-base font-bold">{primary.title}</h2>
              <p className="mt-1 line-clamp-2 text-xs leading-4 text-base-content/65">{primary.description}</p>
              <button type="button" className="btn btn-primary btn-sm mt-2 min-h-9 w-full" onClick={() => chooseQuest(primary)} aria-pressed={selectedQuestId === primary.id}>
                {selectedQuestId === primary.id ? "Ausgewählt ✓" : "Diese Aufgabe wählen"}
              </button>
            </article>
          )}
          {alternative && (
            <article className={`rounded-2xl border p-3 shadow-sm ${selectedQuestId === alternative.id ? "border-primary bg-primary/10" : "border-base-300 bg-base-100"}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="badge badge-ghost badge-sm">Alternative</span>
                <span className="text-xs font-bold text-base-content/60">+{alternative.rewardXp} XP</span>
              </div>
              <h2 className="mt-1 text-base font-bold">{alternative.title}</h2>
              <p className="mt-1 line-clamp-2 text-xs leading-4 text-base-content/65">{alternative.description}</p>
              <button type="button" className="btn btn-outline btn-sm mt-2 min-h-9 w-full" onClick={() => chooseQuest(alternative)} aria-pressed={selectedQuestId === alternative.id}>
                {selectedQuestId === alternative.id ? "Ausgewählt ✓" : "Alternative wählen"}
              </button>
            </article>
          )}
        </div>

        {selectedQuest && (
          <div className="grid gap-1.5">
            <p className="text-center text-xs font-medium" role="status">„{selectedQuest.title}“ ist ausgewählt.</p>
            <Link to="/quests" className="btn btn-primary min-h-9 w-full">Aufgabe starten</Link>
          </div>
        )}

        <button type="button" className="btn btn-outline min-h-10 w-full" onClick={chooseCampfire}>🔥 Lagerfeuer wählen</button>
        <button type="button" className="btn btn-ghost btn-xs" onClick={() => setSavedState(null)}>Werte anpassen</button>
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4" aria-labelledby="mini-hp-heading">
      <header className="space-y-1 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">Schneller HP-Check</p>
        <h1 id="mini-hp-heading" className="text-xl font-bold tracking-tight">Wie geht es dir gerade?</h1>
        <p className="text-xs leading-5 text-base-content/65">Ein kurzer Check genügt. Danach schlägt dir die App eine passende Aufgabe vor – plus eine Alternative.</p>
      </header>

      <div className="grid gap-2.5" aria-label="Aktuellen Zustand einschätzen">
        {areas.map(({ id, label, icon }) => (
          <div key={id} className="space-y-0.5">
            <div className="flex items-center justify-between gap-2 text-sm">
              <label htmlFor={`mini-hp-${id}`} className="font-medium"><span aria-hidden="true" className="mr-1.5">{icon}</span>{label}</label>
              <output htmlFor={`mini-hp-${id}`} className="text-xs font-bold text-primary">{values[id]}/100</output>
            </div>
            <input id={`mini-hp-${id}`} type="range" min="0" max="100" step="1" value={values[id]} onChange={(event) => updateValue(id, Number(event.target.value))} className="range range-primary range-sm w-full" aria-label={`${label}: ${values[id]} von 100`} />
          </div>
        ))}
      </div>

      <button type="button" className="btn btn-primary min-h-10 w-full" onClick={saveCheck}>Aufgabe vorschlagen</button>
      <p className="text-center text-[10px] leading-4 text-base-content/45">Dein Check ist eine persönliche Einschätzung und keine medizinische Diagnose.</p>
    </section>
  );
}
