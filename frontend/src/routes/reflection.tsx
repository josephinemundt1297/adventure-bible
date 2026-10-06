import { useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { notifyAchievements } from "../lib/rewardNotifications";
import { recordReflection } from "../lib/achievements";
import { saveBackendReflection } from "../lib/backendJournalEntries";
import { saveBackendProfile } from "../lib/backendProfile";
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
  const { getToken } = useAuth();
  const { user } = useUser();
  const name = user?.fullName ?? user?.firstName ?? user?.username ?? "Abenteurer";
  const [reflection, setReflection] = useState<ReflectionData>(loadReflection);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [saving, setSaving] = useState(false);
  const todayLabel = formatLongGermanDate();

  function updateField(field: keyof ReflectionData, value: string) {
    setSaved(false);
    setSaveError(false);
    setReflection((current) => ({ ...current, [field]: value }));
  }

  async function saveReflection() {
    sessionStorage.setItem(REFLECTION_KEY, JSON.stringify(reflection));
    saveDayReflection(reflection);
    sessionStorage.removeItem(REFLECTION_KEY);
    setReflection(emptyReflection);
    notifyAchievements(recordReflection());
    setSaved(true);
    setSaveError(false);

    if (!user) return;

    setSaving(true);

    try {
      await saveBackendProfile({
        displayName: name,
        characterName: name,
        getToken,
      });
      await saveBackendReflection({
        reflection,
        getToken,
      });
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4" aria-labelledby="reflection-heading">
      {saved && (
        <div className="rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-semibold text-base-content" role="status" aria-live="polite">
          ✓ Reflexion lokal gespeichert und in dein Tagesjournal übertragen.
        </div>
      )}

      {saveError && (
        <div className="rounded-2xl border border-warning/30 bg-warning/15 px-4 py-3 text-sm font-semibold text-base-content" role="status" aria-live="polite">
          Deine Reflexion konnte gerade nicht in der Datenbank gespeichert werden.
        </div>
      )}

      <header className="adventure-card rounded-3xl border border-primary/15 p-4 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl" aria-hidden="true">
          🌙
        </div>
        <p className="app-kicker mt-3 text-xs font-bold uppercase">
          Abenteuerabschluss
        </p>
        <h1 id="reflection-heading" className="app-heading mt-2 text-2xl font-bold tracking-tight">
          Abendliche Reflexion
        </h1>
        <p className="mt-2 text-sm leading-5 text-base-content/65">
          Ein kurzer Rückblick macht sichtbar, was dein Tag getragen hat.
        </p>
        <p className="mt-3 rounded-full bg-base-100/70 px-3 py-1 text-xs font-semibold text-base-content/60">{todayLabel}</p>
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
        onClick={() => void saveReflection()}
        disabled={saving}
        className="min-h-12 w-full rounded-xl bg-primary px-4 text-sm font-bold text-primary-content shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        {saving ? "Speichern..." : "Reflexion speichern"}
      </button>

      <p className="min-h-5 text-center text-xs font-medium text-primary" aria-live="polite">
        {saved ? "Deine Felder sind wieder frei für einen neuen Eintrag." : ""}
      </p>

      <Link
        to="/calendar"
        className="flex min-h-12 items-center justify-center rounded-xl border border-primary/25 bg-base-100/70 px-4 text-sm font-bold text-primary shadow-sm transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        📅 Tagesjournal ansehen
      </Link>
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
