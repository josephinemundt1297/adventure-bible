export function HomeDashboard() {
  const state = [
    { label: "Energie", value: 58 },
    { label: "Fokus", value: 62 },
    { label: "Stimmung", value: 70 },
    { label: "Körper", value: 54 },
  ];

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-5 px-5 py-6">
      <header>
        <p className="text-sm text-base-content/65">Bereit für dein Abenteuer?</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Guten Morgen, Josi!</h1>
      </header>

      <section className="card border border-base-300 bg-base-100 shadow-sm" aria-labelledby="status-heading">
        <div className="card-body gap-4 p-5">
          <div>
            <h2 id="status-heading" className="card-title text-lg">
              Dein Status
            </h2>
            <p className="mt-1 text-sm text-base-content/60">
              Ein kurzer Blick auf deinen aktuellen Zustand.
            </p>
          </div>

          <div className="space-y-4">
            {state.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                  <span>{item.label}</span>
                  <span className="tabular-nums text-base-content/65">{item.value}/100</span>
                </div>
                <progress
                  className="progress progress-primary h-2 w-full"
                  value={item.value}
                  max="100"
                  aria-label={`${item.label}: ${item.value} von 100`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card border border-base-300 bg-base-100 shadow-sm" aria-labelledby="quest-heading">
        <div className="card-body gap-4 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-base-content/55">
              Empfohlene Quest
            </p>
            <h2 id="quest-heading" className="mt-1 text-xl font-semibold">Trink 2L Wasser</h2>
            <p className="mt-1 text-sm text-base-content/65">
              Eine kleine Aufgabe für heute. Du bestimmst selbst, ob jetzt der richtige Moment ist.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl bg-base-200 px-4 py-3 text-sm">
            <span>Belohnung</span>
            <span className="font-semibold">+20 XP</span>
          </div>

          <button type="button" className="btn btn-primary w-full">
            Starten
          </button>
        </div>
      </section>
    </section>
  );
}
