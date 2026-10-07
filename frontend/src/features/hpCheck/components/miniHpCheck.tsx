import { useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import { initialPlan } from "../../../data/plan";
import { quests } from "../../../data/quests";
import { notifyAchievements } from "../../../lib/rewardNotifications";
import { recordCampfire, recordMiniHpCheck } from "../../../lib/achievements";
import { saveBackendMiniHpCheck } from "../../../lib/backendHpChecks";
import { saveBackendProfile } from "../../../lib/backendProfile";
import { emotionalSupportContacts, getCriticalHpSupport, recordCriticalHpSupport } from "../../../lib/hpSupport";
import { readCompletedQuestIds } from "../../../lib/questHistory";
import { selectMiniQuest } from "../../../lib/miniQuestSelection";
import { leaveCampfire, startCampfire } from "../../../lib/campfire";
import { appendDayJournalEvent } from "../../../lib/dayJournal";
import type { MiniHpArea, MiniHpState } from "../../../types/miniHp";
import type { PlannedActivity } from "../../../types/plan";
import type { Quest } from "../../../types/quest";
import type { HpState } from "../../../types/hp";

const MINI_HP_STATE_KEY = "adventure-bible:mini-hp-state";
const HP_STATE_KEY = "adventure-bible:hp-state";
const MINI_SELECTED_QUEST_KEY = "adventure-bible:mini-selected-quest";
const MINI_SELECTED_QUEST_DETAILS_KEY = "adventure-bible:mini-selected-quest-details";
const PLAN_KEY = "adventure-bible:plan";
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

function miniStateToHpState(state: MiniHpState): HpState {
  const hpAreas = state.values.map(({ area, value }) => ({ area, score: value }));
  const overall = Math.round(
    hpAreas.reduce((sum, area) => sum + area.score, 0) / hpAreas.length,
  );

  return {
    areas: hpAreas,
    overall,
  };
}

function lowestMiniArea(state: MiniHpState): Quest["targetArea"] {
  return [...state.values].sort((a, b) => a.value - b.value)[0]?.area ?? "focus";
}

function activityToQuest(activity: PlannedActivity, state: MiniHpState): Quest {
  return {
    id: `plan-${activity.id}`,
    title: activity.title,
    description: `Aus deinem heutigen Plan um ${activity.time}.`,
    effort: "short",
    rewardXp: activity.type === "quest" ? 20 : 15,
    targetArea: lowestMiniArea(state),
    type: activity.type === "quest" ? "side" : "daily",
  };
}

function readPlanQuest(state: MiniHpState): Quest | null {
  const stored = sessionStorage.getItem(PLAN_KEY);
  if (!stored) {
    const fallback = initialPlan.find((activity) => !activity.completed);
    return fallback ? activityToQuest(fallback, state) : null;
  }

  try {
    const activities = JSON.parse(stored) as PlannedActivity[];
    const activity = activities.find((item) => !item.completed);
    return activity ? activityToQuest(activity, state) : null;
  } catch {
    const fallback = initialPlan.find((activity) => !activity.completed);
    return fallback ? activityToQuest(fallback, state) : null;
  }
}

export function MiniHpCheck() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const name = user?.fullName ?? user?.firstName ?? user?.username ?? "Abenteurer";
  const [values, setValues] = useState(initialValues);
  const [savedState, setSavedState] = useState<MiniHpState | null>(null);
  const [comparisonHpState, setComparisonHpState] = useState<HpState | null>(null);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [campfireStarted, setCampfireStarted] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [supportDismissed, setSupportDismissed] = useState(false);
  const [showEmotionalSupportContacts, setShowEmotionalSupportContacts] = useState(false);
  const [saving, setSaving] = useState(false);

  function updateValue(area: MiniHpArea, value: number) {
    setSavedState(null);
    setComparisonHpState(null);
    setSelectedQuestId(null);
    setCampfireStarted(false);
    setSaveError(false);
    setSupportDismissed(false);
    setShowEmotionalSupportContacts(false);
    setValues((current) => ({ ...current, [area]: value }));
  }

  async function saveCheck() {
    const previousHpState = readPreviousHpState();
    const state: MiniHpState = {
      values: areas.map(({ id }) => ({ area: id, value: values[id] })),
      completedAt: new Date().toISOString(),
    };
    const hpState = miniStateToHpState(state);
    const criticalSupport = getCriticalHpSupport(hpState, [], quests);
    leaveCampfire();
    sessionStorage.setItem(MINI_HP_STATE_KEY, JSON.stringify(state));
    sessionStorage.setItem(HP_STATE_KEY, JSON.stringify(hpState));
    sessionStorage.removeItem(MINI_SELECTED_QUEST_KEY);
    sessionStorage.removeItem(MINI_SELECTED_QUEST_DETAILS_KEY);
    appendDayJournalEvent({ type: "mini-hp-check", state });
    notifyAchievements(recordMiniHpCheck());
    setSelectedQuestId(null);
    setCampfireStarted(false);
    setSaveError(false);
    setSupportDismissed(false);
    setShowEmotionalSupportContacts(
      criticalSupport ? recordCriticalHpSupport(criticalSupport.area) : false,
    );
    setComparisonHpState(previousHpState);
    setSavedState(state);

    if (!user) return;

    setSaving(true);

    try {
      await saveBackendProfile({
        displayName: name,
        characterName: name,
        getToken,
      });
      await saveBackendMiniHpCheck({
        state,
        getToken,
      });
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  }

  function chooseQuest(quest: Quest) {
    leaveCampfire();
    sessionStorage.setItem(MINI_SELECTED_QUEST_KEY, quest.id);
    sessionStorage.setItem(MINI_SELECTED_QUEST_DETAILS_KEY, JSON.stringify(quest));
    setCampfireStarted(false);
    setSelectedQuestId(quest.id);
  }

  function chooseCampfire() {
    startCampfire();
    sessionStorage.removeItem(MINI_SELECTED_QUEST_KEY);
    sessionStorage.removeItem(MINI_SELECTED_QUEST_DETAILS_KEY);
    setSelectedQuestId(null);
    appendDayJournalEvent({ type: "campfire-started" });
    notifyAchievements(recordCampfire());
    setCampfireStarted(true);
  }

  const recommendations = savedState
    ? selectMiniQuest(savedState, quests, readCompletedQuestIds())
    : null;
  const primary = recommendations?.primary ?? null;
  const alternative = recommendations?.alternative ?? null;
  const planQuest = savedState ? readPlanQuest(savedState) : null;
  const selectedQuest = [primary, planQuest, alternative].find((quest) => quest?.id === selectedQuestId) ?? null;
  const previousValues = new Map(
    comparisonHpState?.areas.map((area) => [area.area, area.score]) ?? [],
  );
  const detectedCriticalSupport = savedState
    ? getCriticalHpSupport(miniStateToHpState(savedState), [], quests)
    : null;
  const criticalSupport = supportDismissed ? null : detectedCriticalSupport;

  if (campfireStarted) {
    return (
      <section className="mx-auto flex w-full max-w-md flex-col gap-4 text-center" aria-labelledby="campfire-heading">
        <header className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Lagerfeuer</p>
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
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Check abgeschlossen</p>
          <h1 id="mini-hp-recommendation-heading" className="text-xl font-bold tracking-tight">Was passt gerade zu dir?</h1>
          <p className="text-xs leading-4 text-base-content/65">Möchtest du eine Zeit-Quest machen oder eine Aufgabe von heute erledigen?</p>
        </header>

        {saveError ? (
          <div className="alert alert-warning text-sm" role="status">
            Dein Mini-HP-Check konnte gerade nicht in der Datenbank gespeichert werden.
          </div>
        ) : null}
        {saving ? (
          <div className="alert border-primary/20 bg-primary/10 text-sm text-primary" role="status" aria-live="polite">
            <span className="loading loading-spinner loading-sm" aria-hidden="true" />
            Mini-HP-Check wird gespeichert.
          </div>
        ) : null}

        <div className="grid grid-cols-4 gap-1.5" aria-label="Deine aktuellen Werte">
          {areas.map(({ id, label, icon }) => {
            const previous = previousValues.get(id);
            return (
              <div key={id} className="rounded-xl border border-base-300/70 bg-base-100/70 px-1.5 py-1.5 text-center">
                <span className="text-xs" aria-hidden="true">{icon}</span>
                <p className="text-xs font-semibold text-base-content/60">{label}</p>
                <p className="text-xs font-bold">{values[id]}</p>
                {previous !== undefined ? (
                  <p className="text-xs leading-4 text-base-content/45">vorher {previous}</p>
                ) : (
                  <p className="text-xs leading-4 text-base-content/45">neu</p>
                )}
              </div>
            );
          })}
        </div>

        {criticalSupport ? (
          <article className="rounded-2xl border border-warning/30 bg-warning/10 p-3 shadow-sm" aria-labelledby="mini-critical-support-heading">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-warning">Sanfter Hinweis</p>
                <h2 id="mini-critical-support-heading" className="text-base font-bold">
                  {criticalSupport.areaLabel} wirkt gerade niedrig.
                </h2>
                <p className="text-xs leading-4 text-base-content/70">
                  Du musst nichts davon machen. Falls du magst, kann eine kleine Hilfe gerade leichter sein als eine Quest.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm btn-square shrink-0"
                aria-label="Hinweis schließen"
                onClick={() => setSupportDismissed(true)}
              >
                ×
              </button>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-4 text-base-content/70">
              {criticalSupport.tips.slice(0, 3).map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </article>
        ) : null}

        {showEmotionalSupportContacts ? (
          <section className="rounded-2xl border border-info/30 bg-info/10 p-3 shadow-sm" aria-labelledby="mini-support-contacts-heading">
            <p className="text-xs font-bold uppercase tracking-widest text-info">Zusätzliche Unterstützung</p>
            <h2 id="mini-support-contacts-heading" className="mt-1 text-base font-bold">Du musst damit nicht allein bleiben.</h2>
            <p className="mt-1 text-xs leading-4 text-base-content/70">
              Weil wiederholt kritische Bereiche aufgetaucht sind, kann ein freiwilliges Gespräch helfen.
            </p>
            {emotionalSupportContacts.map((contact) => (
              <article key={contact.phone} className="mt-2 rounded-xl bg-base-100/70 p-2 text-xs leading-4">
                <p className="font-bold">{contact.name}</p>
                <a className="link link-primary font-semibold" href={contact.href}>{contact.phone}</a>
              </article>
            ))}
          </section>
        ) : null}

        <div className="flex flex-col gap-2">
          {primary && (
            <article className={`rounded-2xl border p-3 shadow-sm ${selectedQuestId === primary.id ? "border-primary bg-primary/10" : "border-primary/30 bg-primary/5"}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="badge badge-primary badge-sm">Zeit-Quest</span>
                <span className="text-xs font-bold text-primary">+{primary.rewardXp} XP</span>
              </div>
              <h2 className="mt-1 text-base font-bold">{primary.title}</h2>
              <p className="mt-1 text-xs leading-4 text-base-content/65">{primary.description}</p>
              <button type="button" className="btn btn-primary mt-2 min-h-11 w-full" onClick={() => chooseQuest(primary)} aria-pressed={selectedQuestId === primary.id}>
                {selectedQuestId === primary.id ? "Ausgewählt ✓" : "Zeit-Quest wählen"}
              </button>
            </article>
          )}
          {planQuest && (
            <article className={`rounded-2xl border p-3 shadow-sm ${selectedQuestId === planQuest.id ? "border-primary bg-primary/10" : "border-base-300 bg-base-100"}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="badge badge-ghost badge-sm">Aufgabe von heute</span>
                <span className="text-xs font-bold text-base-content/60">+{planQuest.rewardXp} XP</span>
              </div>
              <h2 className="mt-1 text-base font-bold">{planQuest.title}</h2>
              <p className="mt-1 text-xs leading-4 text-base-content/65">{planQuest.description}</p>
              <button type="button" className="btn btn-outline mt-2 min-h-11 w-full" onClick={() => chooseQuest(planQuest)} aria-pressed={selectedQuestId === planQuest.id}>
                {selectedQuestId === planQuest.id ? "Ausgewählt ✓" : "Plan-Aufgabe wählen"}
              </button>
            </article>
          )}
          {alternative && !planQuest && (
            <article className={`rounded-2xl border p-3 shadow-sm ${selectedQuestId === alternative.id ? "border-primary bg-primary/10" : "border-base-300 bg-base-100"}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="badge badge-ghost badge-sm">Alternative</span>
                <span className="text-xs font-bold text-base-content/60">+{alternative.rewardXp} XP</span>
              </div>
              <h2 className="mt-1 text-base font-bold">{alternative.title}</h2>
              <p className="mt-1 text-xs leading-4 text-base-content/65">{alternative.description}</p>
              <button type="button" className="btn btn-outline mt-2 min-h-11 w-full" onClick={() => chooseQuest(alternative)} aria-pressed={selectedQuestId === alternative.id}>
                {selectedQuestId === alternative.id ? "Ausgewählt ✓" : "Alternative wählen"}
              </button>
            </article>
          )}
        </div>

        {selectedQuest && (
          <div className="flex flex-col gap-1.5">
            <p className="text-center text-xs font-medium" role="status">„{selectedQuest.title}“ ist ausgewählt.</p>
            <Link to="/quests" className="btn btn-primary min-h-11 w-full">Aufgabe starten</Link>
          </div>
        )}

        <button type="button" className="btn btn-outline min-h-11 w-full" onClick={chooseCampfire}>🔥 Lagerfeuer wählen</button>
        <button type="button" className="btn btn-ghost min-h-11 w-full" onClick={() => setSavedState(null)}>Werte anpassen</button>
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4" aria-labelledby="mini-hp-heading">
      <header className="space-y-1 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Schneller HP-Check</p>
        <h1 id="mini-hp-heading" className="text-xl font-bold tracking-tight">Wie geht es dir gerade?</h1>
        <p className="text-xs leading-5 text-base-content/65">Ein kurzer Check genügt. Danach schlägt dir die App eine passende Aufgabe vor – plus eine Alternative.</p>
      </header>

      <div className="flex flex-col gap-2.5" aria-label="Aktuellen Zustand einschätzen">
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

      <button type="button" className="btn btn-primary min-h-11 w-full" disabled={saving} onClick={() => void saveCheck()}>
        {saving ? (
          <>
            <span className="loading loading-spinner loading-sm" aria-hidden="true" />
            Speichern...
          </>
        ) : "Aufgabe vorschlagen"}
      </button>
      {saving ? (
        <p className="text-center text-xs font-semibold text-primary" role="status" aria-live="polite">
          Dein Mini-HP-Check wird gespeichert.
        </p>
      ) : null}
      <p className="text-center text-xs leading-4 text-base-content/45">Dein Check ist eine persönliche Einschätzung und keine medizinische Diagnose.</p>
    </section>
  );
}
