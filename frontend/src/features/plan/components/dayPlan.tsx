import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { initialPlan } from "../../../data/plan";
import type { PlannedActivity } from "../../../types/plan";
import { EmptyState } from "../../../components/ui/emptyState";
import { ErrorState } from "../../../components/ui/errorState";
import { formatShortGermanDate } from "../../../lib/dateFormat";
import { AddActivityDialog } from "./addActivityDialog";

const PLAN_KEY = "adventure-bible:plan";

interface PlanLoadResult {
  activities: PlannedActivity[];
  error: boolean;
}

function loadPlan(): PlanLoadResult {
  const stored = sessionStorage.getItem(PLAN_KEY);
  if (!stored) return { activities: initialPlan, error: false };

  try {
    return { activities: JSON.parse(stored) as PlannedActivity[], error: false };
  } catch {
    return { activities: [], error: true };
  }
}

export function DayPlan() {
  const [{ activities, error: loadError }, setPlan] = useState<PlanLoadResult>(loadPlan);
  const [announcement, setAnnouncement] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  function savePlan(next: PlannedActivity[]) {
    sessionStorage.setItem(PLAN_KEY, JSON.stringify(next));
    setPlan({ activities: next, error: false });
  }

  function toggleActivity(id: string) {
    setPlan((current) => {
      const next = current.activities.map((activity) =>
        activity.id === id ? { ...activity, completed: !activity.completed } : activity,
      );
      sessionStorage.setItem(PLAN_KEY, JSON.stringify(next));

      const changed = next.find((activity) => activity.id === id);
      setAnnouncement(changed ? `${changed.title}: ${changed.completed ? "erledigt" : "wieder offen"}.` : "");

      return { activities: next, error: false };
    });
  }

  function moveActivity(id: string, direction: "up" | "down") {
    setPlan((current) => {
      const index = current.activities.findIndex((activity) => activity.id === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (index < 0 || targetIndex < 0 || targetIndex >= current.activities.length) return current;

      const next = [...current.activities];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      sessionStorage.setItem(PLAN_KEY, JSON.stringify(next));
      setAnnouncement(`${next[targetIndex].title} verschoben.`);
      return { activities: next, error: false };
    });
  }

  function removeActivity(id: string) {
    const activity = activities.find((item) => item.id === id);
    if (!activity) return;

    const next = activities.filter((item) => item.id !== id);
    savePlan(next);
    setAnnouncement(`${activity.title} wurde aus deinem Plan entfernt.`);
  }

  function addActivity(activity: PlannedActivity) {
    const next = [...activities, activity].sort((a, b) => a.time.localeCompare(b.time));
    savePlan(next);
    setAnnouncement(`${activity.title} wurde um ${activity.time} eingeplant.`);
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
                    <button type="button" onClick={() => moveActivity(activity.id, "up")} disabled={index === 0} aria-label={`${activity.title} nach oben verschieben`} className="min-h-8 rounded-lg border border-base-300/70 bg-base-100/60 px-2 text-xs font-semibold text-base-content/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary disabled:opacity-35">↑ Hoch</button>
                    <button type="button" onClick={() => moveActivity(activity.id, "down")} disabled={index === activities.length - 1} aria-label={`${activity.title} nach unten verschieben`} className="min-h-8 rounded-lg border border-base-300/70 bg-base-100/60 px-2 text-xs font-semibold text-base-content/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary disabled:opacity-35">↓ Runter</button>
                    <button type="button" onClick={() => removeActivity(activity.id)} aria-label={`${activity.title} aus dem Plan entfernen`} className="min-h-8 rounded-lg border border-error/20 bg-error/5 px-2 text-xs font-semibold text-error/80 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary">✕ Löschen</button>
                  </div>
                </div>
                <button type="button" onClick={() => toggleActivity(activity.id)} aria-pressed={activity.completed} aria-label={`${activity.completed ? "Als offen markieren" : "Als erledigt markieren"}: ${activity.title}`} className={`min-h-9 shrink-0 rounded-xl px-3 text-xs font-bold focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary ${activity.completed ? "bg-success/15 text-success" : "bg-primary/10 text-primary"}`}>{activity.completed ? "✓ Fertig" : "Erledigt"}</button>
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

      <AddActivityDialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onAdd={addActivity} />
    </div>
  );
}
