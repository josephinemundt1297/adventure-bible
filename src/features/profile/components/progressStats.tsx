import { Link } from "@tanstack/react-router";
import { getLevel, getLevelProgress, readProgress } from "../../../lib/progress";

export function ProgressStats() {
  const progress = readProgress();
  const level = getLevel(progress.xp);
  const levelProgress = getLevelProgress(progress.xp);

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4" aria-labelledby="stats-heading">
      <header className="space-y-2 px-1">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Dein Abenteuer</p>
        <h1 id="stats-heading" className="text-2xl font-bold tracking-tight">Dein Fortschritt</h1>
        <p className="text-sm leading-5 text-base-content/70">
          Ein ruhiger Überblick darüber, was du bereits geschafft hast.
        </p>
      </header>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Level</p>
              <p className="mt-1 text-3xl font-bold">{level}</p>
            </div>
            <p className="text-sm font-semibold text-base-content/70">{levelProgress}/100 XP</p>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={levelProgress}
            max={100}
            aria-label={`${levelProgress} von 100 XP bis zum nächsten Level`}
          />
          <p className="text-sm text-base-content/65">{progress.xp} XP insgesamt</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3" aria-label="Abenteuerwerte">
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body gap-1 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Quests</p>
            <p className="text-2xl font-bold">{progress.completedQuests}</p>
            <p className="text-xs text-base-content/55">abgeschlossen</p>
          </div>
        </div>
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body gap-1 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Quest Points</p>
            <p className="text-2xl font-bold">{progress.questPoints}</p>
            <p className="text-xs text-base-content/55">gesammelt</p>
          </div>
        </div>
      </div>

      <div className="alert border-base-300 bg-base-100 text-sm leading-5 shadow-sm" role="note">
        <span aria-hidden="true">🌿</span>
        <span>Dein Fortschritt ist eine Erinnerung an das, was du getan hast – keine Bewertung deiner Leistung.</span>
      </div>

      <Link
        to="/profile"
        className="btn btn-outline min-h-11 w-full"
      >
        ← Zurück zu Ich
      </Link>
    </section>
  );
}
