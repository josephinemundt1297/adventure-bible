import { useUser } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import { readCampfire } from "../../../lib/campfire";
import { readProgress } from "../../../lib/progress";
import type { HpState } from "../../../types/hp";
import type { QuestProgress } from "../../../types/questProgress";

const HP_STATE_KEY = "adventure-bible:hp-state";
const QUEST_PROGRESS_KEY = "adventure-bible:quest-progress";

const statusAreas = [
  { id: "energy", label: "Energie", icon: "⚡" },
  { id: "focus", label: "Fokus", icon: "🎯" },
  { id: "mood", label: "Stimmung", icon: "🙂" },
  { id: "body", label: "Körper", icon: "❤️" },
] as const;

function readHpState(): HpState | null {
  const stored = sessionStorage.getItem(HP_STATE_KEY);
  if (!stored) return null;
  try { return JSON.parse(stored) as HpState; } catch { sessionStorage.removeItem(HP_STATE_KEY); return null; }
}

function readQuestProgress(): QuestProgress | null {
  const stored = sessionStorage.getItem(QUEST_PROGRESS_KEY);
  if (!stored) return null;
  try { return JSON.parse(stored) as QuestProgress; } catch { sessionStorage.removeItem(QUEST_PROGRESS_KEY); return null; }
}

export function HomeDashboard() {
  const { user } = useUser();
  const name = user?.firstName ?? user?.fullName ?? "Abenteurer";
  const hpState = readHpState();
  const questProgress = readQuestProgress();
  const campfire = readCampfire();
  const progress = readProgress();

  const action = campfire
    ? { eyebrow: "Lagerfeuer", title: "Zeit für Regeneration.", description: "Du hast dich bewusst für eine Pause entschieden. Wenn du bereit bist, beginnt ein neuer Abenteuerzyklus.", label: "Neuen Zyklus starten", to: "/hp-check" as const, icon: "🔥" }
    : questProgress?.status === "active"
      ? { eyebrow: "Aktive Quest", title: questProgress.quest.title, description: "Deine Quest wartet darauf, von dir abgeschlossen zu werden.", label: "Quest öffnen", to: "/quests" as const, icon: "⚔️" }
      : questProgress?.status === "completed"
        ? { eyebrow: "Quest abgeschlossen", title: "Dein nächster Schritt ist der Mini-HP-Check.", description: `Du hast „${questProgress.quest.title}“ abgeschlossen und ${questProgress.rewardXp ?? questProgress.quest.rewardXp} XP erhalten.`, label: "Mini-HP-Check", to: "/mini-hp-check" as const, icon: "✨" }
        : hpState
          ? { eyebrow: "Deine nächste Quest", title: "Ein passender nächster Schritt wartet.", description: "Dein aktueller Zustand hilft dabei, eine Quest passend zu deinen verfügbaren Ressourcen auszuwählen.", label: "Quest ansehen", to: "/quests" as const, icon: "🧭" }
          : { eyebrow: "Neuer Abenteuerzyklus", title: "Wie geht es dir gerade?", description: "Starte mit einem kurzen HP-Check. Es gibt keine richtigen oder falschen Antworten.", label: "HP-Check starten", to: "/hp-check" as const, icon: "♥" };

  return (
    <div className="space-y-3">
      <header className="pt-4">
        <div className="min-w-0">
          <p className="app-kicker text-[0.68rem] font-bold uppercase">Dein Abenteuer</p>
          <h1 className="app-heading mt-1 text-2xl font-bold tracking-tight">Hallo, {name}!</h1>
          <p className="mt-1 text-sm text-base-content/65">Was ist heute dein nächster guter Schritt?</p>
        </div>
      </header>

      {hpState ? (
        <section className="adventure-card rounded-2xl border p-4" aria-labelledby="status-heading">
          <div className="flex items-center justify-between gap-3">
            <h2 id="status-heading" className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Dein Status</h2>
            <span className="text-xs font-semibold text-primary">{hpState.overall}/100 gesamt</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {statusAreas.map((item) => {
              const value = hpState.areas.find((area) => area.area === item.id)?.score ?? 0;
              return (
                <div key={item.id} className="adventure-soft-card rounded-xl border p-3">
                  <div className="flex items-center gap-2 text-sm"><span aria-hidden="true">{item.icon}</span><span className="font-medium">{item.label}</span></div>
                  <p className="mt-2 text-lg font-bold tabular-nums">{value}/100</p>
                  <progress className="progress progress-primary mt-1 h-1.5 w-full" value={value} max="100" aria-label={`${item.label}: ${value} von 100`} />
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="adventure-card rounded-2xl border p-4" aria-labelledby="welcome-heading">
          <h2 id="welcome-heading" className="app-heading text-lg font-bold">Dein Abenteuer beginnt hier.</h2>
          <p className="mt-1 text-sm leading-5 text-base-content/65">Der große HP-Check gibt dir einen Ausgangspunkt für deinen nächsten Schritt.</p>
        </section>
      )}

      <section className="adventure-card rounded-2xl border border-primary/20 p-4" aria-labelledby="next-action-heading">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl" aria-hidden="true">{action.icon}</div>
          <div className="min-w-0 flex-1"><p className="text-xs font-semibold uppercase tracking-wide text-primary">{action.eyebrow}</p><h2 id="next-action-heading" className="app-heading mt-1 text-base font-bold">{action.title}</h2><p className="mt-1 text-sm leading-5 text-base-content/65">{action.description}</p></div>
        </div>
        <Link to={action.to} className="btn btn-primary mt-4 min-h-10 w-full">{action.label}</Link>
      </section>

      <section className="grid grid-cols-3 gap-2" aria-label="Fortschritt">
        <div className="adventure-card rounded-xl border p-3 text-center"><p className="text-[10px] font-semibold uppercase tracking-wide text-base-content/55">XP</p><p className="mt-1 text-base font-bold">{progress.xp}</p></div>
        <div className="adventure-card rounded-xl border p-3 text-center"><p className="text-[10px] font-semibold uppercase tracking-wide text-base-content/55">Quests</p><p className="mt-1 text-base font-bold">{progress.completedQuests}</p></div>
        <div className="adventure-card rounded-xl border p-3 text-center"><p className="text-[10px] font-semibold uppercase tracking-wide text-base-content/55">Points</p><p className="mt-1 text-base font-bold">{progress.questPoints}</p></div>
      </section>
    </div>
  );
}
