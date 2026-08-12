const state = [
  { label: "Energie", value: 58, icon: "⚡" },
  { label: "Fokus", value: 62, icon: "🎯" },
  { label: "Stimmung", value: 70, icon: "🙂" },
  { label: "Körper", value: 54, icon: "❤️" },
] as const;

export function HomeDashboard() {
  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between gap-3 pt-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Guten Morgen, Josi!</h1>
          <p className="mt-1 text-sm text-base-content/65">Bereit für dein Abenteuer?</p>
        </div>

        <div className="flex shrink-0 gap-1" aria-label="Schnellaktionen">
          <button type="button" className="btn btn-ghost btn-sm btn-square" aria-label="Benachrichtigungen">
            <span aria-hidden="true">🔔</span>
          </button>
          <button type="button" className="btn btn-ghost btn-sm btn-square" aria-label="Einstellungen">
            <span aria-hidden="true">⚙</span>
          </button>
        </div>
      </header>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm" aria-labelledby="status-heading">
        <h2 id="status-heading" className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
          Dein Status
        </h2>

        <div className="mt-4 space-y-4">
          {state.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex min-h-6 items-center gap-2 text-sm">
                <span aria-hidden="true" className="w-5 text-center text-base">
                  {item.icon}
                </span>
                <span className="flex-1 font-medium">{item.label}</span>
                <span className="tabular-nums text-xs font-medium text-base-content/65">
                  {item.value}/100
                </span>
              </div>
              <progress
                className="progress progress-primary h-1.5 w-full"
                value={item.value}
                max="100"
                aria-label={`${item.label}: ${item.value} von 100`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm" aria-labelledby="quest-heading">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-base-200 text-lg" aria-hidden="true">
            🧙
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold leading-tight text-base-content/65">
              Empfohlene Quest
              <br />
              für dich
            </p>
            <h2 id="quest-heading" className="mt-2 text-base font-semibold">Trink 2L Wasser</h2>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-base-content/65">+20 XP</span>
              <button type="button" className="btn btn-primary btn-sm min-h-10 px-5">
                Starten
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
