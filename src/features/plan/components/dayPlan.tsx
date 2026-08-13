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

  function moveActivity(id: string) {
    setActivities((current) => {
      const index = current.findIndex((activity) => activity.id === id);
      if (index < 1) return current;

      const next = [...current];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      sessionStorage.setItem(PLAN_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <section className="mx-auto flex max-w-md flex-col gap-5" aria-labelledby="plan-heading">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Dein Tag</p>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 id="plan-heading" className="text-2xl font-bold tracking-tight">
              Mein Plan für heute
            </h1>
            <p className="mt-1 text-sm text-base-content/65">Orientierung statt Pflicht.</p>
          </div>
          <span className="text-sm font-semibold text-base-content/60" aria-label={`${activities.filter((activity) => activity.completed).length} von ${activities.length} erledigt`}>
            {activities.filter((activity) => activity.completed).length}/{activities.length}
          </span>
        </div>
      </header>

      <div className="space-y-3" aria-label="Geplante Aktivitäten">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className={`rounded-2xl border p-4 shadow-sm ${activity.completed ? "border-primary/20 bg-primary/5" : "border-base-300 bg-base-100"}`}
          >
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggleActivity(activity.id)}
                aria-pressed={activity.completed}
                aria-label={`${activity.completed ? "Als offen markieren" : "Als erledigt markieren"}: ${activity.title}`}
                className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {activity.completed ? "✓" : "○"}
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{activity.time}</p>
                  <span className="text-xs font-medium text-base-content/55">
                    {activity.type === "quest" ? "Quest" : "Persönlich"}
                  </span>
                </div>
                <h2 className={`mt-1 font-semibold ${activity.completed ? "line-through text-base-content/55" : ""}`}>
                  {activity.title}
                </h2>
                {!activity.completed && (
                  <button
                    type="button"
                    onClick={() => moveActivity(activity.id)}
                    disabled={activities[0]?.id === activity.id}
                    className="mt-3 min-h-10 rounded-xl px-3 text-xs font-semibold text-primary underline underline-offset-2 disabled:cursor-default disabled:opacity-40"
                  >
                    Nach oben verschieben
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="rounded-2xl border border-base-300 bg-base-100 p-4 text-sm leading-5 text-base-content/70" role="note">
        Dein Plan darf sich verändern. Verschieben ist ein Teil des Plans – kein Scheitern.
      </p>
    </section>
  );
}
