import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { quests } from "../../../data/quests";
import { addProgress } from "../../../lib/progress";
import { recordQuestCompletion } from "../../../lib/achievements";
import { selectQuest } from "../../../lib/questSelection";
import type { HpState } from "../../../types/hp";
import type { Quest } from "../../../types/quest";
import type { QuestProgress } from "../../../types/questProgress";

const QUEST_PROGRESS_KEY = "adventure-bible:quest-progress";
const MINI_SELECTED_QUEST_KEY = "adventure-bible:mini-selected-quest";

interface QuestRecommendationProps { state: HpState; }

function readMiniSelectedQuest(): Quest | null {
  const selectedId = sessionStorage.getItem(MINI_SELECTED_QUEST_KEY);
  if (!selectedId) return null;
  return quests.find((quest) => quest.id === selectedId) ?? null;
}

export function QuestRecommendation({ state }: QuestRecommendationProps) {
  const quest = readMiniSelectedQuest() ?? selectQuest(state, quests);
  const [progress, setProgress] = useState<QuestProgress | null>(() => {
    const stored = sessionStorage.getItem(QUEST_PROGRESS_KEY);
    if (!stored) return null;
    try { return JSON.parse(stored) as QuestProgress; }
    catch { sessionStorage.removeItem(QUEST_PROGRESS_KEY); return null; }
  });

  if (!quest) return <p>Aktuell ist keine Quest verfügbar.</p>;

  const selectedQuest = quest;
  const activeQuest = progress?.quest.id === selectedQuest.id ? progress : null;

  function startQuest() {
    const nextProgress: QuestProgress = { quest: selectedQuest, status: "active" };
    sessionStorage.setItem(QUEST_PROGRESS_KEY, JSON.stringify(nextProgress));
    sessionStorage.removeItem(MINI_SELECTED_QUEST_KEY);
    setProgress(nextProgress);
  }

  function completeQuest() {
    const completedProgress: QuestProgress = {
      quest: selectedQuest,
      status: "completed",
      completedAt: new Date().toISOString(),
      rewardXp: selectedQuest.rewardXp,
      rewardQuestPoints: 1,
    };
    sessionStorage.setItem(QUEST_PROGRESS_KEY, JSON.stringify(completedProgress));
    addProgress(selectedQuest.rewardXp, 1);
    recordQuestCompletion();
    setProgress(completedProgress);
  }

  if (activeQuest?.status === "completed") {
    return (
      <section className="space-y-5" aria-labelledby="quest-complete-heading">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Quest abgeschlossen</p>
          <h1 id="quest-complete-heading" className="text-2xl font-bold tracking-tight">Gut gemacht! 🎉</h1>
          <p className="text-sm leading-6 text-base-content/70">Du hast „{selectedQuest.title}“ abgeschlossen. Dein Fortschritt ist sichtbar und die nächste Entscheidung liegt bei dir.</p>
        </header>
        <article className="card border border-primary/20 bg-base-100 shadow-sm">
          <div className="card-body items-center gap-3 text-center">
            <span className="badge badge-primary badge-lg">Reward</span>
            <p className="text-3xl font-bold text-primary">+{selectedQuest.rewardXp} XP</p>
            <p className="font-semibold">+1 Quest Point</p>
          </div>
        </article>
        <Link to="/mini-hp-check" className="btn btn-primary w-full">Mini HP-Check</Link>
      </section>
    );
  }

  if (activeQuest?.status === "active") {
    return (
      <section className="space-y-5" aria-labelledby="active-quest-heading">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Aktive Quest</p>
          <h1 id="active-quest-heading" className="text-2xl font-bold tracking-tight">{selectedQuest.title}</h1>
          <p className="text-sm leading-6 text-base-content/70">Nimm dir den Raum, den diese Aufgabe braucht. Du entscheidest selbst, wann du sie abschließt.</p>
        </header>
        <article className="card border border-primary/20 bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <span className="badge badge-primary w-fit">In Arbeit</span>
            <p className="text-sm leading-6">{selectedQuest.description}</p>
            <div className="flex items-center justify-between text-sm text-base-content/60"><span>Aufwand: {selectedQuest.effort === "short" ? "kurz" : "mittel"}</span><span>+{selectedQuest.rewardXp} XP</span></div>
            <button type="button" className="btn btn-primary w-full" onClick={completeQuest}>Quest abschließen</button>
          </div>
        </article>
      </section>
    );
  }

  return (
    <section className="space-y-5" aria-labelledby="quest-heading">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Deine nächste Quest</p>
        <h1 id="quest-heading" className="text-2xl font-bold tracking-tight">Eine passende Aufgabe wartet auf dich.</h1>
        <p className="text-sm leading-6 text-base-content/70">Deine Empfehlung orientiert sich an dem Bereich, der gerade am meisten Unterstützung gebrauchen kann.</p>
      </header>
      <article className="card border border-primary/20 bg-base-100 shadow-sm">
        <div className="card-body gap-4">
          <div className="flex items-center justify-between gap-3"><span className="badge badge-primary">{selectedQuest.type === "recovery" ? "Recovery Quest" : "Side Quest"}</span><span className="text-sm font-semibold text-primary">+{selectedQuest.rewardXp} XP</span></div>
          <div><h2 className="text-xl font-bold">{selectedQuest.title}</h2><p className="mt-2 text-sm leading-6 text-base-content/70">{selectedQuest.description}</p></div>
          <div className="flex items-center justify-between text-sm text-base-content/60"><span>Aufwand: {selectedQuest.effort === "short" ? "kurz" : "mittel"}</span><span>Empfohlen für dich</span></div>
          <button type="button" className="btn btn-primary w-full" onClick={startQuest}>Quest starten</button>
        </div>
      </article>
    </section>
  );
}
