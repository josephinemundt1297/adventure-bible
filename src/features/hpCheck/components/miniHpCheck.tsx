import { useState } from "react";
import type { MiniHpArea, MiniHpState } from "../../../types/miniHp";

const MINI_HP_STATE_KEY = "adventure-bible:mini-hp-state";

const areas: Array<{
  id: MiniHpArea;
  label: string;
  icon: string;
}> = [
  { id: "energy", label: "Energie", icon: "⚡" },
  { id: "focus", label: "Fokus", icon: "🎯" },
  { id: "mood", label: "Stimmung", icon: "🙂" },
  { id: "body", label: "Körper", icon: "❤️" },
];

const initialValues: Record<MiniHpArea, number> = {
  energy: 50,
  focus: 50,
  mood: 50,
  body: 50,
};

export function MiniHpCheck() {
  const [values, setValues] = useState(initialValues);
  const [saved, setSaved] = useState(false);

  function updateValue(area: MiniHpArea, value: number) {
    setSaved(false);
    setValues((current) => ({ ...current, [area]: value }));
  }

  function saveCheck() {
    const state: MiniHpState = {
      values: areas.map(({ id }) => ({ area: id, value: values[id] })),
      completedAt: new Date().toISOString(),
    };

    sessionStorage.setItem(MINI_HP_STATE_KEY, JSON.stringify(state));
    setSaved(true);
  }

  return (
    <section className="space-y-6" aria-labelledby="mini-hp-heading">
      <header className="space-y-2 text-center">
        <h1 id="mini-hp-heading" className="text-2xl font-bold tracking-tight">
          Wie geht es dir gerade?
        </h1>
        <p className="text-sm leading-6 text-base-content/70">
          Dein Zustand hilft der App, dich besser zu unterstützen.
        </p>
      </header>

      <div className="space-y-6" aria-label="Aktuellen Zustand einschätzen">
        {areas.map(({ id, label, icon }) => (
          <div key={id} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`mini-hp-${id}`} className="font-medium">
                <span aria-hidden="true" className="mr-2">
                  {icon}
                </span>
                {label}
              </label>
              <output htmlFor={`mini-hp-${id}`} className="min-w-12 text-right text-sm font-semibold">
                {values[id]}/100
              </output>
            </div>

            <input
              id={`mini-hp-${id}`}
              type="range"
              min="0"
              max="100"
              step="1"
              value={values[id]}
              onChange={(event) => updateValue(id, Number(event.target.value))}
              className="range range-primary w-full"
              aria-label={`${label}: ${values[id]} von 100`}
            />
          </div>
        ))}
      </div>

      <button type="button" className="btn btn-primary w-full" onClick={saveCheck}>
        Speichern
      </button>

      {saved && (
        <p className="text-center text-sm font-medium text-success" role="status">
          Zustand gespeichert. 🌿
        </p>
      )}
    </section>
  );
}
