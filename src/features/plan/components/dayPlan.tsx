import { useState } from "react";
import { initialPlan } from "../../../data/plan";
import type { PlannedActivity } from "../../../types/plan";

const PLAN_KEY = "adventure-bible:plan";

function loadPlan(): PlannedActivity[] {
  const stored = sessionStorage.getItem(PLAN_KEY);
  if (!stored) return initialPlan;

  try {
    return JSON.parse(stored) as PlannedActivity[];
  } catch {
    sessionStorage.removeItem(PLAN_KEY);
    return initialPlan;
  }
}

export function DayPlan() {
  const [activities, setActivities] = useState<PlannedActivity[]>(loadPlan);

  function toggleActivity(id: string) {
    setActivities((current) => {
      const next = current.map((activity) =>
        activity.id === id ? { ...activity, completed: !activity.completed } : activity,
      );
      sessionStorage.setItem(PLAN_KEY, JSON.stringify(next));
      return next;
    });
  }

  function moveActivity(id: string, direction: "up" | "down") {
    setActivities((current) => {
      const index = current.findIndex((activity) => activity.id === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (index < 0 || targetIndex < 0 || targetIndex >= current.length) return current;

      const next = [...current];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      sessionStorage.setItem(PLAN_KEY, JSON.stringify(next));
      return next;
    });
  }

  const completedCount = activities.filter((activity) => activity.completed).length;

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4" aria-labelledby="plan-heading">
      <header className="px-2 pt-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 id="plan-heading" className="text-2xl font-bold tracking-tight">
              Mein Plan für heute
            </h1>
            <p className="mt-1 text-sm text-base-content/60">Dein Tag darf flexibel bleiben.</p>
          </div>
          <button
            type="button"
            aria-label="Kalender öffnen"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            📅
          </button>
        </div>
        <p className="mt-3 text-xs font-semibold text-base-content/50">
          {completedCount} von {activities.length} erledigt
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-base-300/60 bg-base-100/75" aria-label="Geplante Aktivitäten">
        {activities.map((activity, index) => (
          <article
            key={activity.id}
            className={`px-4 py-3.5 ${index !== activities.length - 1 ? "border-b border-base-300/60" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex size-9 shrink-0 items-center justify-center text-xl"
                aria-hidden="true"
              >
                {activity.type === "quest" ? "🎯" : "🧳"}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-base-content/60">{activity.time}</p>
                <h2
                  className={`mt-0.5 font-semibold leading-5 ${activity.completed ? "text-base-content/50 line-through" : ""}`}
                >
                  {activity.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => toggleActivity(activity.id)}
                aria-pressed={activity.completed}
                aria-label={`${activity.completed ? "Als offen markieren" : "Als erledigt markieren"}: ${activity.title}`}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {activity.completed ? "✓" : "○"}
              </button>
            </div>

            <div className="mt-2 flex justify-end gap-1 pl-12">
              <button
                type="button"
                onClick={() => moveActivity(activity.id, "up")}
                disabled={index === 0}
                aria-label={`${activity.title} nach oben verschieben`}
                className="min-h-9 rounded-lg px-2 text-xs font-semibold text-base-content/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-25"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveActivity(activity.id, "down")}
                disabled={index === activities.length - 1}
                aria-label={`${activity.title} nach unten verschieben`}
                className="min-h-9 rounded-lg px-2 text-xs font-semibold text-base-content/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-25"
              >
                ↓
              </button>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        disabled
        aria-label="Aktivität hinzufügen"
        className="min-h-11 w-full rounded-xl bg-primary px-4 font-semibold text-primary-content shadow-sm opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default"
      >
        + Aktivität hinzufügen
      </button>

      <p className="px-2 text-center text-xs leading-5 text-base-content/55" role="note">
        Verschieben ist ein Teil des Plans – kein Scheitern.
      </p>
    </section>
  );
}
