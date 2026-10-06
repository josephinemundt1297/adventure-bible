import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import { EmptyState } from "../../../components/ui/emptyState";
import { ErrorState } from "../../../components/ui/errorState";
import { initialPlan } from "../../../data/plan";
import {
  createBackendPlanActivity,
  deleteBackendPlanActivity,
  listBackendPlanActivities,
  mapBackendPlanActivity,
  updateBackendPlanActivity,
} from "../../../lib/backendPlanActivities";
import { formatShortGermanDate } from "../../../lib/dateFormat";
import { getJournalDate } from "../../../lib/dayJournal";
import type { PlannedActivity } from "../../../types/plan";
import { AddActivityDialog } from "./addActivityDialog";

const PLAN_KEY = "adventure-bible:plan";

interface PlanLoadResult {
  activities: PlannedActivity[];
  error: boolean;
}

function withSortOrder(activities: PlannedActivity[]) {
  return activities.map((activity, index) => ({
    ...activity,
    sortOrder: index,
  }));
}

function sortPlan(activities: PlannedActivity[]) {
  return [...activities].sort((a, b) => {
    const sortOrder = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    return sortOrder !== 0 ? sortOrder : a.time.localeCompare(b.time);
  });
}

function loadPlan(): PlanLoadResult {
  const stored = sessionStorage.getItem(PLAN_KEY);
  if (!stored) return { activities: initialPlan, error: false };

  try {
    return {
      activities: sortPlan(JSON.parse(stored) as PlannedActivity[]),
      error: false,
    };
  } catch {
    return { activities: [], error: true };
  }
}

function saveFallbackPlan(next: PlannedActivity[]) {
  sessionStorage.setItem(PLAN_KEY, JSON.stringify(next));
}

export function DayPlan() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [{ activities, error: loadError }, setPlan] =
    useState<PlanLoadResult>(loadPlan);
  const [announcement, setAnnouncement] = useState("");
  const [backendWarning, setBackendWarning] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoadingBackendPlan, setIsLoadingBackendPlan] = useState(false);
  const seededBackendPlanRef = useRef(false);
  const activityDate = getJournalDate();

  const canUseBackend = isLoaded && isSignedIn;

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    let didCancel = false;

    async function loadBackendPlan() {
      setIsLoadingBackendPlan(true);
      setBackendWarning("");

      try {
        const response = await listBackendPlanActivities({
          activityDate,
          getToken,
        });

        if (didCancel) return;

        if (response.data.length > 0) {
          const backendActivities = sortPlan(
            response.data.map(mapBackendPlanActivity),
          );
          saveFallbackPlan(backendActivities);
          setPlan({ activities: backendActivities, error: false });
          return;
        }

        if (seededBackendPlanRef.current) return;
        seededBackendPlanRef.current = true;

        const seededActivities = await Promise.all(
          withSortOrder(initialPlan).map((activity) =>
            createBackendPlanActivity({
              activity,
              activityDate,
              getToken,
            }),
          ),
        );

        if (didCancel) return;

        const backendActivities = sortPlan(
          seededActivities.map((responseItem) =>
            mapBackendPlanActivity(responseItem.data),
          ),
        );
        saveFallbackPlan(backendActivities);
        setPlan({ activities: backendActivities, error: false });
      } catch {
        if (!didCancel) {
          setBackendWarning(
            "Dein Plan konnte gerade nicht mit dem Backend synchronisiert werden.",
          );
        }
      } finally {
        if (!didCancel) {
          setIsLoadingBackendPlan(false);
        }
      }
    }

    void loadBackendPlan();

    return () => {
      didCancel = true;
    };
  }, [activityDate, getToken, isLoaded, isSignedIn]);

  function savePlan(nextActivities: PlannedActivity[]) {
    const next = sortPlan(withSortOrder(nextActivities));
    saveFallbackPlan(next);
    setPlan({ activities: next, error: false });
  }

  async function toggleActivity(id: string) {
    const activity = activities.find((item) => item.id === id);
    if (!activity) return;

    const next = activities.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
    savePlan(next);

    const changed = next.find((item) => item.id === id);
    setAnnouncement(
      changed
        ? `${changed.title}: ${changed.completed ? "erledigt" : "wieder offen"}.`
        : "",
    );

    if (!canUseBackend || !changed) return;

    try {
      await updateBackendPlanActivity({
        activityId: id,
        getToken,
        patch: {
          completed: changed.completed,
        },
      });
      setBackendWarning("");
    } catch {
      savePlan(activities);
      setBackendWarning("Die Änderung konnte nicht im Backend gespeichert werden.");
    }
  }

  async function moveActivity(id: string, direction: "up" | "down") {
    const index = activities.findIndex((activity) => activity.id === id);
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (index < 0 || targetIndex < 0 || targetIndex >= activities.length) return;

    const next = [...activities];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    const sortedNext = withSortOrder(next);
    savePlan(sortedNext);
    setAnnouncement(`${sortedNext[targetIndex].title} verschoben.`);

    if (!canUseBackend) return;

    try {
      await Promise.all(
        sortedNext.map((activity) =>
          updateBackendPlanActivity({
            activityId: activity.id,
            getToken,
            patch: {
              sortOrder: activity.sortOrder,
            },
          }),
        ),
      );
      setBackendWarning("");
    } catch {
      savePlan(activities);
      setBackendWarning(
        "Die neue Reihenfolge konnte nicht im Backend gespeichert werden.",
      );
    }
  }

  async function removeActivity(id: string) {
    const activity = activities.find((item) => item.id === id);
    if (!activity) return;

    const next = activities.filter((item) => item.id !== id);
    savePlan(next);
    setAnnouncement(`${activity.title} wurde aus deinem Plan entfernt.`);

    if (!canUseBackend) return;

    try {
      await deleteBackendPlanActivity({
        activityId: id,
        getToken,
      });
      setBackendWarning("");
    } catch {
      savePlan(activities);
      setBackendWarning(
        "Die Aktivität konnte nicht im Backend gelöscht werden.",
      );
    }
  }

  async function addActivity(activity: PlannedActivity) {
    const nextActivity = {
      ...activity,
      sortOrder: activities.length,
    };

    if (canUseBackend) {
      try {
        const createdActivity = await createBackendPlanActivity({
          activity: nextActivity,
          activityDate,
          getToken,
        });
        const backendActivity = mapBackendPlanActivity(createdActivity.data);
        savePlan([...activities, backendActivity]);
        setAnnouncement(
          `${backendActivity.title} wurde um ${backendActivity.time} eingeplant.`,
        );
        setBackendWarning("");
        setIsAddDialogOpen(false);
        return;
      } catch {
        setBackendWarning(
          "Die Aktivität konnte nicht im Backend gespeichert werden.",
        );
      }
    }

    savePlan([...activities, nextActivity]);
    setAnnouncement(`${nextActivity.title} wurde um ${nextActivity.time} eingeplant.`);
    setIsAddDialogOpen(false);
  }

  function retryLoad() {
    sessionStorage.removeItem(PLAN_KEY);
    setPlan({ activities: initialPlan, error: false });
    setAnnouncement("Plan konnte wiederhergestellt werden.");
  }

  const completedCount = activities.filter((activity) => activity.completed).length;
  const todayLabel = formatShortGermanDate();

  if (loadError) {
    return (
      <ErrorState
        title="Dein Plan konnte nicht geladen werden"
        description="Die gespeicherten Aktivitäten konnten nicht gelesen werden. Dein bisheriger Plan wurde nicht verändert."
        action={<button type="button" onClick={retryLoad} className="btn btn-primary w-full">Plan wiederherstellen</button>}
      />
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col" aria-labelledby="plan-heading">
      <p className="sr-only" aria-live="polite">{announcement}</p>

      <header className="shrink-0 px-2 pt-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 id="plan-heading" className="text-xl font-bold tracking-tight">Mein Plan für heute</h1>
            <p className="mt-1 text-xs text-base-content/60">{todayLabel}</p>
          </div>
          <Link
            to="/calendar"
            aria-label="Tagesjournal und Kalender öffnen"
            className="flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-primary/25 bg-primary/10 px-3 text-xs font-bold text-primary shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span aria-hidden="true">📅</span>
            Journal
          </Link>
        </div>
        <p className="mt-2 text-xs font-semibold text-base-content/50">{completedCount} von {activities.length} erledigt</p>
        {isLoadingBackendPlan ? (
          <p className="mt-2 text-xs font-semibold text-primary">Plan wird mit dem Backend geladen...</p>
        ) : null}
        {backendWarning ? (
          <p className="mt-2 rounded-xl bg-warning/20 px-3 py-2 text-xs font-semibold leading-4 text-base-content">
            {backendWarning}
          </p>
        ) : null}
      </header>

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-2xl border border-base-300/50 bg-base-100/60" aria-label="Geplante Aktivitäten">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <article key={activity.id} className={`px-3 py-3 ${index !== activities.length - 1 ? "border-b border-base-300/50" : ""}`}>
              <div className="flex min-h-16 items-start gap-2">
                <span className="flex size-10 shrink-0 items-center justify-center text-xl leading-none" aria-hidden="true">{activity.type === "quest" ? "🎯" : "🧳"}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold leading-4 text-base-content/60">{activity.time}</p>
                  <h2 className={`text-sm font-semibold leading-5 ${activity.completed ? "text-base-content/50 line-through" : ""}`}>{activity.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <button type="button" onClick={() => void moveActivity(activity.id, "up")} disabled={index === 0} aria-label={`${activity.title} nach oben verschieben`} className="min-h-11 rounded-lg border border-base-300/70 bg-base-100/60 px-2 text-xs font-semibold text-base-content/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary disabled:opacity-35">↑ Hoch</button>
                    <button type="button" onClick={() => void moveActivity(activity.id, "down")} disabled={index === activities.length - 1} aria-label={`${activity.title} nach unten verschieben`} className="min-h-11 rounded-lg border border-base-300/70 bg-base-100/60 px-2 text-xs font-semibold text-base-content/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary disabled:opacity-35">↓ Runter</button>
                    <button type="button" onClick={() => void removeActivity(activity.id)} aria-label={`${activity.title} aus dem Plan entfernen`} className="min-h-11 rounded-lg border border-error/20 bg-error/5 px-2 text-xs font-semibold text-error/80 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary">✕ Löschen</button>
                  </div>
                </div>
                <button type="button" onClick={() => void toggleActivity(activity.id)} aria-pressed={activity.completed} aria-label={`${activity.completed ? "Als offen markieren" : "Als erledigt markieren"}: ${activity.title}`} className={`min-h-11 shrink-0 rounded-xl px-3 text-xs font-bold focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary ${activity.completed ? "bg-success/15 text-base-content" : "bg-primary/10 text-primary"}`}>{activity.completed ? "✓ Fertig" : "Erledigt"}</button>
              </div>
            </article>
          ))
        ) : (
          <div className="p-3">
            <EmptyState title="Dein Plan ist noch leer" description="Füge eine Quest aus deiner Aufgabenbibliothek oder eine eigene Aktivität hinzu." />
          </div>
        )}
      </div>

      <div className="shrink-0 space-y-3 pt-3">
        <button type="button" onClick={() => setIsAddDialogOpen(true)} aria-label="Aktivität hinzufügen" className="min-h-11 w-full rounded-xl bg-primary px-4 text-sm font-semibold text-primary-content shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">+ Aktivität hinzufügen</button>

        <Link to="/reflection" className="flex min-h-11 w-full items-center justify-center rounded-xl border border-primary/30 bg-base-100/60 px-4 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">🌙 Abendliche Reflexion</Link>

        <p className="px-2 text-center text-xs leading-4 text-base-content/55" role="note">Verschieben ist ein Teil des Plans – kein Scheitern.</p>
      </div>

      <AddActivityDialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onAdd={(activity) => void addActivity(activity)} />
    </div>
  );
}
