import { useEffect, useState } from "react";
import { getLevel, getLevelProgress, readProgress } from "../../../lib/progress";
import type { ProgressState } from "../../../types/progress";

interface CharacterViewProps {
  name: string;
}

export function CharacterView({ name }: CharacterViewProps) {
  const [progress, setProgress] = useState<ProgressState>(() => readProgress());

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  const level = getLevel(progress.xp);
  const levelProgress = getLevelProgress(progress.xp);

  return (
    <section
      className="mx-auto flex max-w-md flex-col gap-5"
      aria-labelledby="character-heading"
    >
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          Dein Charakter
        </p>
        <h1 id="character-heading" className="text-2xl font-bold tracking-tight">
          {name}
        </h1>
        <p className="text-sm leading-5 text-base-content/70">
          Dein Abenteuer beginnt mit dem Zustand, in dem du heute ankommst.
        </p>
      </header>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body items-center gap-3 text-center">
          <div
            className="flex size-28 items-center justify-center rounded-full bg-base-200 text-6xl"
            aria-hidden="true"
          >
            🦝
          </div>
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="mt-1 text-sm text-base-content/65">Level {level} · Neues Abenteuer</p>
          </div>
        </div>
      </div>

      <div className="card border border-base-300 bg-base-100 shadow-sm" aria-labelledby="progress-heading">
        <div className="card-body gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 id="progress-heading" className="font-bold">Dein Fortschritt</h2>
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
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3" aria-label="Charakterstatus">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Quest Points
          </p>
          <p className="mt-1 text-lg font-bold">{progress.questPoints}</p>
        </div>
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Abenteuer
          </p>
          <p className="mt-1 text-lg font-bold">{progress.completedQuests}</p>
        </div>
      </div>

      <div className="alert border-base-300 bg-base-100 text-sm leading-5 shadow-sm" role="status">
        <span aria-hidden="true">🌿</span>
        <span>Dein Charakter zeigt Fortschritt – nicht deinen persönlichen Wert.</span>
      </div>
    </section>
  );
}
