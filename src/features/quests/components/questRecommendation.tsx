import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { quests } from "../../../data/quests";
import { selectQuest } from "../../../lib/questSelection";
import type { HpState } from "../../../types/hp";
import type { QuestProgress } from "../../../types/questProgress";

const QUEST_PROGRESS_KEY = "adventure-bible:quest-progress";

interface QuestRecommendationProps {
  state: HpState;
}

export function QuestRecommendation({ state }: QuestRecommendationProps) {
  const quest = selectQuest(state, quests);
  const [progress, setProgress] = useState<QuestProgress | null>(() => {
    const stored = sessionStorage.getItem(QUEST_PROGRESS_KEY);
    if (!stored) return null;

    try {
      return JSON.parse(stored) as QuestProgress;
    } catch {
      sessionStorage.removeItem(QUEST_PROGRESS_KEY);
      return null;
    }
  });

  if (!quest) {
    return <p>Aktuell ist keine Quest verfügbar.</p>;
  }

  const activeQuest = progress?.quest.id === quest.id ? progress : null;

  function startQuest() {
    const nextProgress: QuestProgress = {
      quest,
      status: "active",
    };
    sessionStorage.setItem(QUEST_PROGRESS_KEY, JSON.stringify(nextProgress));
    setProgress(nextProgress);
  }

  function completeQuest() {
    const completedProgress: QuestProgress = {
      quest,
      status: "completed",
      completedAt: new Date().toISOString(),
      rewardXp: quest.rewardXp,
      rewardQuestPoints: 1,
    };
    sessionStorage.setItem(QUEST_PROGRESS_KEY, JSON.stringify(completedProgress));
    setProgress(completedProgress);
  }

  if (activeQuest?.status === "completed") {
    return (
      <section className="space-y-5" aria-labelledby="quest-complete-heading">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Quest abgeschlossen</p>
          <h1 id="quest-complete-heading" className="text-2xl font-bold tracking-tight">
            Gut gemacht! 🎉
          </h1>
          <p className="text-sm leading-6 text-base-content/70">
            Du hast „{quest.title}“ abgeschlossen. Dein Fortschritt ist sichtbar und die nächste Entscheidung liegt bei dir.
          </p>
        </header>

        <article className="card border border-primary/20 bg-base-100 shadow-sm">
          <div className="card-body items-center text-center gap-3">
            <span className="badge badge-primary badge-lg">Reward</span>
            <p className="text-3xl font-bold text-primary">+{quest.rewardXp} XP</p>
            <p className="font-semibold">+1 Quest Point</p>
          </div>
        </article>

        <Link to="/hp-check" className="btn btn-primary w-full">
          Mini HP-Check vorbereiten
        </Link>
      </section>
    );
  }

  if (activeQuest?.status === "active") {
    return (
      <section className="space-y-5" aria-labelledby="active-quest-heading">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Aktive Quest</p>
          <h1 id="active-quest-heading" className="text-2xl font-bold tracking-tight">{quest.title}</h1>
          <p className="text-sm leading-6 text-base-content/70">
            Nimm dir den Raum, den diese Aufgabe braucht. Du entscheidest selbst, wann du sie abschließt.
          </p>
        </header>

        <article className="card border border-primary/20 bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <span className="badge badge-primary w-fit">In Arbeit</span>
            <p className="text-sm leading-6">{quest.description}</p>
            <div className="flex items-center justify-between text-sm text-base-content/60">
              <span>Aufwand: {quest.effort === "short" ? "kurz" : "mittel"}</span>
              <span>+{quest.rewardXp} XP</span>
            </div>
            <button type="button" className="btn btn-primary w-full" onClick={completeQuest}>
              Quest abschließen
            </button>
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
          <button type="button" className="btn btn-primary w-full" onClick={startQuest}>
            Quest starten
          </button>
        </div>
      </article>
    </section>
  );
}
