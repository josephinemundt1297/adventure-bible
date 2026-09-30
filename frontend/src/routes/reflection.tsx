import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { notifyAchievements } from "../lib/rewardNotifications";
import { recordReflection } from "../lib/achievements";
import { saveDayReflection } from "../lib/dayJournal";
import { formatLongGermanDate } from "../lib/dateFormat";

const REFLECTION_KEY = "adventure-bible:reflection";

interface ReflectionData {
  good: string;
  challenging: string;
  grateful: string;
  tomorrow: string;
}

const emptyReflection: ReflectionData = {
  good: "",
  challenging: "",
  grateful: "",
  tomorrow: "",
};

function loadReflection(): ReflectionData {
  const stored = sessionStorage.getItem(REFLECTION_KEY);
  if (!stored) return emptyReflection;

  try {
    return { ...emptyReflection, ...(JSON.parse(stored) as Partial<ReflectionData>) };
  } catch {
    // Kaputte lokale Daten sollen die Reflexion nicht blockieren.
    return emptyReflection;
  }
}

export const Route = createFileRoute("/reflection")({ component: ReflectionPage });

function ReflectionPage() {
  const [reflection, setReflection] = useState<ReflectionData>(loadReflection);
  const [saved, setSaved] = useState(false);
  const todayLabel = formatLongGermanDate();

  function updateField(field: keyof ReflectionData, value: string) {
    setSaved(false);
    setReflection((current) => ({ ...current, [field]: value }));
  }

  function saveReflection() {
    sessionStorage.setItem(REFLECTION_KEY, JSON.stringify(reflection));
    saveDayReflection(reflection);
    sessionStorage.removeItem(REFLECTION_KEY);
    setReflection(emptyReflection);
    notifyAchievements(recordReflection());
    setSaved(true);
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4" aria-labelledby="reflection-heading">
      {saved && (
        <div className="rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-semibold text-success" role="status" aria-live="polite">
          ✓ Reflexion gespeichert und in dein Tagesjournal übertragen.
        </div>
      )}

      <header className="px-2 pt-1 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Abenteuerabschluss
        </p>
        <h1 id="reflection-heading" className="mt-2 text-2xl font-bold tracking-tight">
          Abendliche Reflexion
        </h1>
        <p className="mt-2 text-sm leading-5 text-base-content/65">
          Kein Test. Kein Urteil. Nur ein kurzer Blick zurück auf deinen Tag.
        </p>
        <p className="mt-2 text-xs text-base-content/50">{todayLabel}</p>
      </header>

      <div className="flex flex-col gap-3">
        <ReflectionField
          label="Was war heute gut?"
          icon="♡"
          value={reflection.good}
          onChange={(value) => updateField("good", value)}
          placeholder="Auch kleine Dinge zählen …"
        />
        <ReflectionField
          label="Was war herausfordernd?"
          icon="✦"
          value={reflection.challenging}
          onChange={(value) => updateField("challenging", value)}
          placeholder="Was war heute schwer?"
        />
        <ReflectionField
          label="Wofür bin ich dankbar?"
          icon="❧"
          value={reflection.grateful}
          onChange={(value) => updateField("grateful", value)}
          placeholder="Eine Person, ein Moment oder etwas Kleines …"
        />
        <ReflectionField
          label="Notiz für morgen"
          icon="✎"
          value={reflection.tomorrow}
          onChange={(value) => updateField("tomorrow", value)}
          placeholder="Was möchtest du morgen mitnehmen?"
        />
      </div>

      <button
        type="button"
        onClick={saveReflection}
        className="min-h-12 w-full rounded-xl bg-primary px-4 text-sm font-bold text-primary-content shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        Reflexion speichern
      </button>

      <p className="min-h-5 text-center text-xs font-medium text-primary" aria-live="polite">
        {saved ? "Deine Felder sind wieder frei für einen neuen Eintrag." : ""}
      </p>
    </section>
  );
}

interface ReflectionFieldProps {
  label: string;
  icon: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function ReflectionField({ label, icon, value, onChange, placeholder }: ReflectionFieldProps) {
  return (
    <label className="rounded-2xl border border-base-300/60 bg-base-100/60 p-3 shadow-sm">
      <span className="flex items-center gap-2 text-sm font-bold">
        <span aria-hidden="true" className="text-lg text-primary">
          {icon}
        </span>
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="textarea textarea-bordered mt-2 min-h-20 w-full resize-none bg-base-100 text-sm leading-5 placeholder:text-base-content/35 focus:outline-2 focus:outline-primary"
      />
    </label>
  );
}
