import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { quests } from "../../../data/quests";
import { notifyAchievements } from "../../../lib/rewardNotifications";
import { addProgress } from "../../../lib/progress";
import { recordQuestCompletion } from "../../../lib/achievements";
import { leaveCampfire } from "../../../lib/campfire";
import { readCompletedQuestIds, recordQuestCompletion as recordQuestHistory } from "../../../lib/questHistory";
import { selectQuest } from "../../../lib/questSelection";
import type { HpState } from "../../../types/hp";
import type { Quest } from "../../../types/quest";
import type { QuestProgress } from "../../../types/questProgress";

const QUEST_PROGRESS_KEY = "adventure-bible:quest-progress";
const MINI_SELECTED_QUEST_KEY = "adventure-bible:mini-selected-quest";

interface QuestRecommendationProps {
  state: HpState;
}

function readMiniSelectedQuest(): Quest | null {
  const selectedId = sessionStorage.getItem(MINI_SELECTED_QUEST_KEY);
  if (!selectedId) return null;
  return quests.find((quest) => quest.id === selectedId) ?? null;
}

function readQuestProgress(): QuestProgress | null {
  const stored = sessionStorage.getItem(QUEST_PROGRESS_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as QuestProgress;
  } catch {
    sessionStorage.removeItem(QUEST_PROGRESS_KEY);
    return null;
  }
}

export function QuestRecommendation({ state }: QuestRecommendationProps) {
  const [progress, setProgress] = useState<QuestProgress | null>(readQuestProgress);

  // Active/completed quests always win over a fresh recommendation. This keeps
  // the selected quest visible until the user explicitly starts a new HP check.
  const selectedQuest =
    progress?.status === "active" || progress?.status === "completed"
      ? progress.quest
      : readMiniSelectedQuest() ?? selectQuest(state, quests, readCompletedQuestIds());

  if (!selectedQuest) {
    return <p>Aktuell ist keine Quest verfügbar.</p>;
  }

  // Keep a narrowed Quest reference for event handlers/closures so TypeScript
  // can guarantee that quest data exists when an action is performed.
  const quest = selectedQuest;

  function startQuest() {
    leaveCampfire();
    const nextProgress: QuestProgress = { quest, status: "active" };
    sessionStorage.setItem(QUEST_PROGRESS_KEY, JSON.stringify(nextProgress));
    sessionStorage.removeItem(MINI_SELECTED_QUEST_KEY);
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
    recordQuestHistory(quest.id);
    addProgress(quest.rewardXp, 1);
    notifyAchievements(recordQuestCompletion());
    setProgress(completedProgress);
  }

  if (progress?.status === "completed") {
    return (
      <section className="space-y-5" aria-labelledby="quest-complete-heading">
        <header className="grid h-[168px] grid-rows-[24px_58px_72px] gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Quest abgeschlossen</p>
          <h1 id="quest-complete-heading" className="text-2xl font-bold leading-7 tracking-tight">Gut gemacht! 🎉</h1>
          <p className="text-sm leading-6 text-base-content/70">Du hast „{quest.title}“ abgeschlossen. Dein Fortschritt ist gespeichert.</p>
        </header>

        <article className="card h-[220px] border border-primary/20 bg-base-100 shadow-sm">
          <div className="card-body grid grid-rows-[32px_52px_28px] place-items-center content-center gap-3 text-center">
            <span className="badge badge-primary badge-lg">Reward</span>
            <p className="text-3xl font-bold text-primary">+{quest.rewardXp} XP</p>
            <p className="font-semibold">+1 Quest Point</p>
          </div>
        </article>

        <Link to="/mini-hp-check" className="btn btn-primary w-full">Neuen HP-Check starten</Link>
      </section>
    );
  }

  if (progress?.status === "active") {
    return (
      <section className="space-y-5" aria-labelledby="active-quest-heading">
        <header className="grid h-[168px] grid-rows-[24px_58px_72px] gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Aktive Quest</p>
          <h1 id="active-quest-heading" className="overflow-hidden text-2xl font-bold leading-7 tracking-tight">{quest.title}</h1>
          <p className="text-sm leading-6 text-base-content/70">Nimm dir den Raum, den diese Aufgabe braucht. Du entscheidest selbst, wann du sie abschließt.</p>
        </header>

        <article className="card h-[250px] border border-primary/20 bg-base-100 shadow-sm">
          <div className="card-body grid grid-rows-[24px_72px_24px_40px] gap-3">
            <span className="badge badge-primary w-fit">In Arbeit</span>
            <p className="overflow-hidden text-sm leading-6">{quest.description}</p>
            <div className="flex items-center justify-between text-sm text-base-content/60">
              <span>Aufwand: {quest.effort === "short" ? "kurz" : "mittel"}</span>
              <span>+{quest.rewardXp} XP</span>
            </div>
            <button type="button" className="btn btn-primary min-h-10 w-full" onClick={completeQuest}>Quest abschließen</button>
          </div>
        </article>
      </section>
    );
  }

  return (
    <section className="space-y-5" aria-labelledby="quest-heading">
      <header className="grid h-[168px] grid-rows-[24px_58px_72px] gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Deine nächste Quest</p>
        <h1 id="quest-heading" className="overflow-hidden text-2xl font-bold leading-7 tracking-tight">Eine passende Aufgabe wartet auf dich.</h1>
        <p className="text-sm leading-6 text-base-content/70">Deine Empfehlung orientiert sich an dem Bereich, der gerade am meisten Unterstützung gebrauchen kann.</p>
      </header>

      <article className="card h-[280px] border border-primary/20 bg-base-100 shadow-sm">
        <div className="card-body grid grid-rows-[24px_32px_72px_24px_40px] gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="badge badge-primary">{quest.type === "recovery" ? "Recovery Quest" : "Side Quest"}</span>
            <span className="text-sm font-semibold text-primary">+{quest.rewardXp} XP</span>
          </div>
          <h2 className="overflow-hidden text-xl font-bold leading-7">{quest.title}</h2>
          <p className="overflow-hidden text-sm leading-6 text-base-content/70">{quest.description}</p>
          <div className="flex items-center justify-between text-sm text-base-content/60">
            <span>Aufwand: {quest.effort === "short" ? "kurz" : "mittel"}</span>
            <span>Empfohlen für dich</span>
          </div>
          <button type="button" className="btn btn-primary min-h-10 w-full" onClick={startQuest}>Quest starten</button>
        </div>
      </article>
    </section>
  );
}
