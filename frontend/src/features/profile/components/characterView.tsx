import { Link } from "@tanstack/react-router";
import { getLevel, getLevelProgress, readProgress } from "../../../lib/progress";

interface CharacterViewProps {
  name: string;
}

export function CharacterView({ name }: CharacterViewProps) {
  const progress = readProgress();

  const level = getLevel(progress.xp);
  const levelProgress = getLevelProgress(progress.xp);

  return (
    <section
      className="mx-auto flex max-w-md flex-col gap-5"
      aria-labelledby="character-heading"
    >
      <header className="space-y-2">
        <p className="app-kicker text-xs font-bold uppercase">Dein Charakter</p>
        <h1 id="character-heading" className="app-heading text-2xl font-bold tracking-tight">
          {name}
        </h1>
        <p className="text-sm leading-5 text-base-content/70">
          Dein Abenteuer beginnt mit dem Zustand, in dem du heute ankommst.
        </p>
      </header>

      <div className="adventure-card rounded-2xl border shadow-sm">
        <div className="card-body items-center gap-3 text-center">
          <div className="app-character-surface flex h-40 w-32 items-end justify-center overflow-hidden rounded-2xl" aria-hidden="true">
            <img className="adventure-art h-full w-full" src="/raccoon-adventure.svg" alt="" />
          </div>
          <div>
            <h2 className="app-heading text-xl font-bold">{name}</h2>
            <p className="mt-1 text-sm text-base-content/65">Level {level} · Neues Abenteuer</p>
          </div>
        </div>
      </div>

      <div className="adventure-card rounded-2xl border shadow-sm" aria-labelledby="profile-level-heading">
        <div className="card-body gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 id="profile-level-heading" className="app-heading font-bold">LV-Info</h2>
            <span className="text-sm font-semibold">Level {level}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-base-content/70">
            <span>{progress.xp} XP gesamt</span>
            <span>{levelProgress}/100 XP</span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={levelProgress}
            max={100}
            aria-label={`${levelProgress} von 100 XP bis zum nächsten Level`}
          />
          <div className="grid grid-cols-2 gap-2 pt-1" aria-label="Levelwerte">
            <div className="rounded-xl bg-primary/8 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/55">Quests</p>
              <p className="text-lg font-bold">{progress.completedQuests}</p>
            </div>
            <div className="rounded-xl bg-primary/8 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/55">Quest Points</p>
              <p className="text-lg font-bold">{progress.questPoints}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3" aria-label="Profilbereiche">
        <Link to="/stats" className="adventure-card flex min-h-14 items-center justify-between rounded-2xl border px-4 py-3 text-left shadow-sm">
          <span>
            <span className="block text-sm font-bold">Fortschritt anzeigen</span>
            <span className="block text-xs text-base-content/60">HP-Verlauf und Werte</span>
          </span>
          <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">▧</span>
        </Link>
        <Link to="/achievements" className="adventure-card flex min-h-14 items-center justify-between rounded-2xl border px-4 py-3 text-left shadow-sm">
          <span>
            <span className="block text-sm font-bold">Meilensteine</span>
            <span className="block text-xs text-base-content/60">Achievement-Regal</span>
          </span>
          <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">✦</span>
        </Link>
      </div>

      <div className="alert border-base-300 bg-base-100 text-sm leading-5 shadow-sm" role="status">
        <span aria-hidden="true">🌿</span>
        <span>Dein Charakter zeigt Fortschritt – nicht deinen persönlichen Wert.</span>
      </div>
    </section>
  );
}
