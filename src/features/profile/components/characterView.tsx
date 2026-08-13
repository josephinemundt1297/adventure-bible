interface CharacterViewProps {
  name: string;
}

export function CharacterView({ name }: CharacterViewProps) {
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
            <p className="mt-1 text-sm text-base-content/65">Level 1 · Neues Abenteuer</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3" aria-label="Charakterstatus">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
            XP
          </p>
          <p className="mt-1 text-lg font-bold">0</p>
        </div>
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Abenteuer
          </p>
          <p className="mt-1 text-lg font-bold">0</p>
        </div>
      </div>

      <div className="alert border-base-300 bg-base-100 text-sm leading-5 shadow-sm" role="status">
        <span aria-hidden="true">🌿</span>
        <span>Dein Charakter zeigt Fortschritt – nicht deinen persönlichen Wert.</span>
      </div>
    </section>
  );
}
