import { useAuth, useUser } from "@clerk/react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { initialPlan } from "../../../data/plan";
import { quests } from "../../../data/quests";
import { notifyAchievements } from "../../../lib/rewardNotifications";
import { addProgress } from "../../../lib/progress";
import { recordCampfire, recordQuestCompletion } from "../../../lib/achievements";
import { completeBackendQuestLog, startBackendQuestLog } from "../../../lib/backendQuestLogs";
import { saveBackendProfile } from "../../../lib/backendProfile";
import { leaveCampfire, startCampfire } from "../../../lib/campfire";
import { appendDayJournalEvent } from "../../../lib/dayJournal";
import { readCompletedQuestIds, recordQuestCompletion as recordQuestHistory } from "../../../lib/questHistory";
import { selectQuest } from "../../../lib/questSelection";
import type { HpState } from "../../../types/hp";
import type { PlannedActivity } from "../../../types/plan";
import type { Quest } from "../../../types/quest";
import type { QuestProgress } from "../../../types/questProgress";

const QUEST_PROGRESS_KEY = "adventure-bible:quest-progress";
const MINI_SELECTED_QUEST_KEY = "adventure-bible:mini-selected-quest";
const MINI_SELECTED_QUEST_DETAILS_KEY = "adventure-bible:mini-selected-quest-details";
const PLAN_KEY = "adventure-bible:plan";

interface QuestRecommendationProps {
  state: HpState;
}

function readMiniSelectedQuest(): Quest | null {
  const selectedDetails = sessionStorage.getItem(MINI_SELECTED_QUEST_DETAILS_KEY);
  if (selectedDetails) {
    try {
      return JSON.parse(selectedDetails) as Quest;
    } catch {
      sessionStorage.removeItem(MINI_SELECTED_QUEST_DETAILS_KEY);
    }
  }

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

function lowestHpTargetArea(state: HpState): Quest["targetArea"] {
  return [...state.areas].sort((a, b) => a.score - b.score)[0]?.area ?? "focus";
}

function readPlanQuest(state: HpState): Quest | null {
  const stored = sessionStorage.getItem(PLAN_KEY);
  if (!stored) {
    const fallbackActivity = initialPlan.find((item) => !item.completed);
    if (!fallbackActivity) return null;

    return {
      id: `plan-${fallbackActivity.id}`,
      title: fallbackActivity.title,
      description: `Aus deinem heutigen Plan um ${fallbackActivity.time}.`,
      effort: "short",
      rewardXp: fallbackActivity.type === "quest" ? 20 : 15,
      targetArea: lowestHpTargetArea(state),
      type: fallbackActivity.type === "quest" ? "side" : "daily",
    };
  }

  try {
    const activities = JSON.parse(stored) as PlannedActivity[];
    const activity = activities.find((item) => !item.completed);
    if (!activity) return null;

    return {
      id: `plan-${activity.id}`,
      title: activity.title,
      description: `Aus deinem heutigen Plan um ${activity.time}.`,
      effort: "short",
      rewardXp: activity.type === "quest" ? 20 : 15,
      targetArea: lowestHpTargetArea(state),
      type: activity.type === "quest" ? "side" : "daily",
    };
  } catch {
    return null;
  }
}

function selectSideQuest(state: HpState): Quest | null {
  const completedIds = readCompletedQuestIds();
  const sideQuests = quests.filter((quest) => quest.type === "side");
  return selectQuest(state, sideQuests.length > 0 ? sideQuests : quests, completedIds);
}

export function QuestRecommendation({ state }: QuestRecommendationProps) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const name = user?.fullName ?? user?.firstName ?? user?.username ?? "Abenteurer";
  const [progress, setProgress] = useState<QuestProgress | null>(readQuestProgress);
  const [campfireStarted, setCampfireStarted] = useState(false);
  const [syncError, setSyncError] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const miniSelectedQuest = readMiniSelectedQuest();
  const sideQuest = miniSelectedQuest ?? selectSideQuest(state);
  const planQuest = readPlanQuest(state);
  const selectedQuest = progress?.status === "active" || progress?.status === "completed" ? progress.quest : sideQuest;
  const canSyncBackend = isLoaded && isSignedIn;

  if (!selectedQuest && !planQuest) {
    return <p>Aktuell ist keine Quest verfügbar.</p>;
  }

  const quest = selectedQuest ?? planQuest!;

  async function ensureProfile() {
    if (!canSyncBackend) return;

    await saveBackendProfile({
      displayName: name,
      characterName: name,
      getToken,
    });
  }

  async function startQuest(nextQuest: Quest) {
    leaveCampfire();
    const nextProgress: QuestProgress = { quest: nextQuest, status: "active" };
    sessionStorage.setItem(QUEST_PROGRESS_KEY, JSON.stringify(nextProgress));
    sessionStorage.removeItem(MINI_SELECTED_QUEST_KEY);
    sessionStorage.removeItem(MINI_SELECTED_QUEST_DETAILS_KEY);
    appendDayJournalEvent({ type: "quest-started", quest: nextQuest });
    setProgress(nextProgress);

    if (!canSyncBackend) return;

    setSyncing(true);
    setSyncError(false);

    try {
      await ensureProfile();
      const backendProgress = await startBackendQuestLog({ quest: nextQuest, getToken });
      const syncedProgress: QuestProgress = {
        ...nextProgress,
        backendQuestId: backendProgress.quest.id,
        backendQuestLogId: backendProgress.questLog.id,
      };

      sessionStorage.setItem(QUEST_PROGRESS_KEY, JSON.stringify(syncedProgress));
      setProgress(syncedProgress);
    } catch {
      setSyncError(true);
    } finally {
      setSyncing(false);
    }
  }

  function chooseCampfire() {
    startCampfire();
    sessionStorage.removeItem(MINI_SELECTED_QUEST_KEY);
    appendDayJournalEvent({ type: "campfire-started" });
    notifyAchievements(recordCampfire());
    setCampfireStarted(true);
  }

  async function completeQuest() {
    const completedProgress: QuestProgress = {
      quest,
      status: "completed",
      backendQuestId: progress?.backendQuestId,
      backendQuestLogId: progress?.backendQuestLogId,
      completedAt: new Date().toISOString(),
      rewardXp: quest.rewardXp,
      rewardQuestPoints: 1,
    };

    sessionStorage.setItem(QUEST_PROGRESS_KEY, JSON.stringify(completedProgress));
    recordQuestHistory(quest.id);
    addProgress(quest.rewardXp, 1);
    appendDayJournalEvent({
      type: "quest-completed",
      quest,
      rewardXp: quest.rewardXp,
      rewardQuestPoints: 1,
    });
    notifyAchievements(recordQuestCompletion());
    setProgress(completedProgress);

    if (!canSyncBackend) return;

    setSyncing(true);
    setSyncError(false);

    try {
      await ensureProfile();
      const questLog = await completeBackendQuestLog({
        backendQuestLogId: progress?.backendQuestLogId,
        quest,
        getToken,
      });
      const syncedProgress: QuestProgress = {
        ...completedProgress,
        backendQuestLogId: questLog.id,
        backendQuestId: questLog.questId,
      };

      sessionStorage.setItem(QUEST_PROGRESS_KEY, JSON.stringify(syncedProgress));
      setProgress(syncedProgress);
    } catch {
      setSyncError(true);
    } finally {
      setSyncing(false);
    }
  }

  if (progress?.status === "completed") {
    return (
      <section className="space-y-5" aria-labelledby="quest-complete-heading">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Quest abgeschlossen</p>
          <h1 id="quest-complete-heading" className="app-heading text-2xl font-bold leading-7 tracking-tight">Gut gemacht! 🎉</h1>
          <p className="text-sm leading-6 text-base-content/70">Du hast „{quest.title}“ abgeschlossen. Dein Fortschritt ist gespeichert.</p>
        </header>

        <article className="adventure-card card border border-primary/20">
          <div className="card-body items-center gap-3 text-center">
            <span className="badge badge-primary badge-lg">Reward</span>
            <p className="app-heading text-3xl font-bold text-primary">+{quest.rewardXp} XP</p>
            <p className="font-semibold">+1 Quest Point</p>
          </div>
        </article>

        {syncError ? <div className="alert alert-warning text-sm" role="status">Dein Quest-Abschluss konnte gerade nicht in der Datenbank gespeichert werden.</div> : null}
        <Link to="/mini-hp-check" className="btn btn-primary w-full">Neuen HP-Check starten</Link>
      </section>
    );
  }

  if (campfireStarted) {
    return (
      <section className="space-y-5 text-center" aria-labelledby="quest-campfire-heading">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Lagerfeuer</p>
          <h1 id="quest-campfire-heading" className="app-heading text-2xl font-bold leading-7 tracking-tight">Du darfst regenerieren.</h1>
          <p className="text-sm leading-6 text-base-content/70">Du hast bewusst eine Pause gewählt. Das ist ein gültiger Teil deines Abenteuerzyklus.</p>
        </header>
        <Link to="/hp-check" className="btn btn-primary min-h-11 w-full">Neuen Abenteuerzyklus starten</Link>
      </section>
    );
  }

  if (progress?.status === "active") {
    return (
      <section className="space-y-5" aria-labelledby="active-quest-heading">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Aktive Quest</p>
          <h1 id="active-quest-heading" className="app-heading text-2xl font-bold leading-7 tracking-tight">{quest.title}</h1>
          <p className="text-sm leading-6 text-base-content/70">Nimm dir den Raum, den diese Aufgabe braucht. Du entscheidest selbst, wann du sie abschließt.</p>
        </header>

        <article className="adventure-card card border border-primary/20">
          <div className="card-body gap-3">
            <span className="badge badge-primary w-fit">In Arbeit</span>
            <p className="text-sm leading-6">{quest.description}</p>
          <div className="flex items-center justify-between text-sm text-base-content/60">
            <span>Aufwand: {quest.effort === "short" ? "kurz" : "mittel"}</span>
            <span>+{quest.rewardXp} XP</span>
          </div>
            {syncError ? <div className="alert alert-warning text-sm" role="status">Deine Quest konnte gerade nicht in der Datenbank gespeichert werden.</div> : null}
            <button type="button" className="btn btn-primary min-h-11 w-full" disabled={syncing || !canSyncBackend} onClick={() => void completeQuest()}>{syncing ? "Speichern..." : "Quest abschließen"}</button>
          </div>
        </article>
      </section>
    );
  }

  return (
    <section className="space-y-5" aria-labelledby="quest-heading">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Deine nächste Quest</p>
        <h1 id="quest-heading" className="app-heading text-2xl font-bold leading-7 tracking-tight">Eine passende Aufgabe wartet auf dich.</h1>
        <p className="text-sm leading-6 text-base-content/70">Deine Empfehlung orientiert sich an dem Bereich, der gerade am meisten Unterstützung gebrauchen kann.</p>
      </header>

      <div className="grid gap-3">
        {sideQuest ? (
          <article className="adventure-card card border border-primary/20">
            <div className="card-body gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="badge badge-primary h-auto min-h-7 whitespace-nowrap px-3 py-1 text-xs leading-none">Side Quest</span>
                <span className="shrink-0 text-sm font-semibold text-primary">+{sideQuest.rewardXp} XP</span>
              </div>
              <h2 className="app-heading text-xl font-bold leading-7">{sideQuest.title}</h2>
              <p className="text-sm leading-6 text-base-content/70">{sideQuest.description}</p>
              {syncError ? <div className="alert alert-warning text-sm" role="status">Deine Quest konnte gerade nicht in der Datenbank gespeichert werden.</div> : null}
              <button type="button" className="btn btn-primary min-h-11 w-full" disabled={syncing || !canSyncBackend} onClick={() => void startQuest(sideQuest)}>{syncing ? "Speichern..." : "Sidequest starten"}</button>
            </div>
          </article>
        ) : null}

        {planQuest ? (
          <article className="adventure-card card border border-base-300">
            <div className="card-body gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="badge badge-ghost h-auto min-h-7 whitespace-nowrap px-3 py-1 text-xs leading-none">Aus deinem Plan</span>
                <span className="shrink-0 text-sm font-semibold text-base-content/60">+{planQuest.rewardXp} XP</span>
              </div>
              <h2 className="app-heading text-xl font-bold leading-7">{planQuest.title}</h2>
              <p className="text-sm leading-6 text-base-content/70">{planQuest.description}</p>
              <button type="button" className="btn btn-outline min-h-11 w-full" disabled={syncing || !canSyncBackend} onClick={() => void startQuest(planQuest)}>{syncing ? "Speichern..." : "Plan-Aufgabe starten"}</button>
            </div>
          </article>
        ) : null}

        <button type="button" className="btn btn-ghost min-h-11 w-full border border-primary/25 bg-primary/5 text-primary" onClick={chooseCampfire}>
          Lagerfeuer wählen
        </button>
      </div>
    </section>
  );
}
