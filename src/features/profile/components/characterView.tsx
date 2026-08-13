interface CharacterViewProps {
  name: string;
}

export function CharacterView({ name }: CharacterViewProps) {
  return (
    <section className="mx-auto max-w-md space-y-6" aria-labelledby="character-heading">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Dein Charakter</p>
        <h1 id="character-heading" className="mt-2 text-2xl font-bold tracking-tight">
          Willkommen, {name}!
        </h1>
        <p className="mt-2 text-sm leading-6 text-base-content/70">
          Dein Abenteuer beginnt mit dem Zustand, in dem du heute ankommst.
        </p>
      </div>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body items-center text-center">
          <div
            className="flex size-24 items-center justify-center rounded-full bg-base-200 text-5xl"
            aria-hidden="true"
          >
            🦝
          </div>
          <h2 className="card-title mt-2">{name}</h2>
          <p className="text-sm text-base-content/65">Level 1 · Neues Abenteuer</p>
        </div>
      </div>

      <div className="alert border-base-300 bg-base-100 text-sm shadow-sm" role="status">
        <span aria-hidden="true">🌿</span>
        <span>Dein Charakter zeigt Fortschritt – nicht deinen persönlichen Wert.</span>
      </div>
    </section>
  );
}
