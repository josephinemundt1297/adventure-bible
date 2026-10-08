import { useAuth } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getLevel, getLevelProgress, readProgress } from "../../../lib/progress";
import {
  ACHIEVEMENTS,
  getUnlockedAchievementDetails,
  type Achievement,
  type UnlockedAchievement,
} from "../../../lib/achievements";
import { listBackendHpChecks } from "../../../lib/backendHpChecks";
import { readAllDayJournals } from "../../../lib/dayJournal";
import {
  buildHpHistoryChartPoints,
  collectBackendHpHistoryPoints,
  collectHpHistoryPoints,
  countHpHistoryCheckDays,
  filterHpHistoryPoints,
  type HpHistoryPoint,
  getHpHistoryRangeDayCount,
  type HpHistoryMetric,
  type HpHistoryRange,
} from "../../../lib/hpHistory";

const historyRanges: Array<{ id: HpHistoryRange; label: string }> = [
  { id: "day", label: "Tag" },
  { id: "week", label: "Woche" },
  { id: "month", label: "Monat" },
  { id: "year", label: "Jahr" },
];

const historyMetrics: Array<{ color: string; dash?: string; emoji: string; id: HpHistoryMetric; label: string; shape: string }> = [
  { id: "overall", label: "Gesamt", emoji: "✦", color: "#2563eb", shape: "●" },
  { id: "energy", label: "Energie", emoji: "⚡", color: "#b45309", shape: "◆" },
  { id: "focus", label: "Fokus", emoji: "🎯", color: "#7c3aed", dash: "6 4", shape: "■" },
  { id: "mood", label: "Stimmung", emoji: "🙂", color: "#0f766e", dash: "2 4", shape: "▲" },
  { id: "body", label: "Körper", emoji: "♡", color: "#be123c", dash: "10 4", shape: "●" },
];

const achievementCategories: Array<{ id: Achievement["category"]; label: string; shelfColor: string }> = [
  { id: "checks", label: "HP-Checks", shelfColor: "border-sky-500/35 bg-sky-500/10" },
  { id: "quests", label: "Quests", shelfColor: "border-amber-500/35 bg-amber-500/10" },
  { id: "recovery", label: "Regeneration", shelfColor: "border-emerald-500/35 bg-emerald-500/10" },
  { id: "reflection", label: "Reflexion", shelfColor: "border-violet-500/35 bg-violet-500/10" },
];

function formatHistoryLabel(dateString: string, range: HpHistoryRange) {
  const date = new Date(dateString);
  if (range === "day") {
    return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}

function formatAchievementDate(unlockedAt?: string) {
  if (!unlockedAt) return "Noch nicht freigeschaltet";
  if (unlockedAt === "Bereits freigeschaltet") return unlockedAt;

  const date = new Date(unlockedAt);
  if (Number.isNaN(date.getTime())) return "Datum unbekannt";

  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

interface ProgressStatsProps {
  view?: "all" | "achievements" | "progress";
}

export function ProgressStats({ view = "all" }: ProgressStatsProps) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [historyRange, setHistoryRange] = useState<HpHistoryRange>("year");
  const [historyMetric, setHistoryMetric] = useState<HpHistoryMetric>("overall");
  const [backendHistoryPoints, setBackendHistoryPoints] = useState<HpHistoryPoint[] | null>(null);
  const [historyLoadFailed, setHistoryLoadFailed] = useState(false);
  const [selectedAchievementId, setSelectedAchievementId] = useState<string | null>(null);
  const [achievementDialogOpen, setAchievementDialogOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [achievementsOpen, setAchievementsOpen] = useState(true);
  const [openAchievementCategories, setOpenAchievementCategories] = useState<Record<Achievement["category"], boolean>>({
    checks: true,
    quests: false,
    recovery: false,
    reflection: false,
  });
  const progress = readProgress();
  const achievements = getUnlockedAchievementDetails();
  const unlockedById = new Map<string, UnlockedAchievement>(achievements.map((achievement) => [achievement.id, achievement]));
  const selectedAchievement = ACHIEVEMENTS.find((achievement) => achievement.id === selectedAchievementId) ?? null;
  const selectedUnlockedAchievement = selectedAchievement ? unlockedById.get(selectedAchievement.id) : null;
  const level = getLevel(progress.xp);
  const levelProgress = getLevelProgress(progress.xp);
  const localHistoryPoints = useMemo(() => collectHpHistoryPoints(readAllDayJournals()), []);
  const historyPoints = backendHistoryPoints ?? localHistoryPoints;
  const visibleHistoryPoints = filterHpHistoryPoints(historyPoints, historyRange);
  const selectedMetric = historyMetrics.find((metric) => metric.id === historyMetric) ?? historyMetrics[0];
  const chartData = buildHpHistoryChartPoints(visibleHistoryPoints, historyMetric);
  const checkedDayCount = countHpHistoryCheckDays(visibleHistoryPoints);
  const rangeDayCount = getHpHistoryRangeDayCount(historyRange);
  const latestChartPoint = chartData.at(-1) ?? null;
  const firstChartPoint = chartData[0] ?? null;
  const trendDelta = latestChartPoint && firstChartPoint
    ? (latestChartPoint?.value ?? 0) - (firstChartPoint?.value ?? 0)
    : 0;
  const firstLabel = chartData[0] ? formatHistoryLabel(chartData[0].createdAt, historyRange) : "";
  const lastLabel = chartData.at(-1) ? formatHistoryLabel(chartData.at(-1)!.createdAt, historyRange) : "";
  const showProgress = view !== "achievements";
  const showAchievements = view !== "progress";

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !showProgress) return;

    let isCurrent = true;

    async function loadBackendHpHistory() {
      try {
        const response = await listBackendHpChecks({ getToken });
        if (!isCurrent) return;

        setBackendHistoryPoints(collectBackendHpHistoryPoints(response.data));
        setHistoryLoadFailed(false);
      } catch {
        if (!isCurrent) return;

        setBackendHistoryPoints(null);
        setHistoryLoadFailed(true);
      }
    }

    void loadBackendHpHistory();

    return () => {
      isCurrent = false;
    };
  }, [getToken, isLoaded, isSignedIn, showProgress]);

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4" aria-labelledby="stats-heading">
      <header className="space-y-2 px-1">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Dein Abenteuer</p>
        <h1 id="stats-heading" className="text-2xl font-bold tracking-tight">{view === "achievements" ? "Deine Meilensteine" : "Dein Fortschritt"}</h1>
        <p className="text-sm leading-5 text-base-content/70">
          {view === "achievements" ? "Dein Achievement-Regal mit Details zu freigeschalteten Abzeichen." : "Ein ruhiger Überblick darüber, was du bereits geschafft hast."}
        </p>
      </header>

      {showProgress ? (
        <>
          <div id="level-info-heading" className="card scroll-mt-4 border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body gap-4">
              <div className="flex items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">LV-Info</p><p className="mt-1 text-3xl font-bold">Level {level}</p></div><p className="text-sm font-semibold text-base-content/70">{levelProgress}/100 XP</p></div>
              <progress className="progress progress-primary w-full" value={levelProgress} max={100} aria-label={`${levelProgress} von 100 XP bis zum nächsten Level`} />
              <p className="text-sm text-base-content/65">{progress.xp} XP insgesamt</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3" aria-label="Abenteuerwerte">
            <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body gap-1 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Quests</p><p className="text-2xl font-bold">{progress.completedQuests}</p><p className="text-xs text-base-content/55">abgeschlossen</p></div></div>
            <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body gap-1 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Quest Points</p><p className="text-2xl font-bold">{progress.questPoints}</p><p className="text-xs text-base-content/55">gesammelt</p></div></div>
          </div>
        </>
      ) : null}

      {showProgress ? <details
        className="rounded-2xl border border-base-300 bg-base-100 shadow-sm"
        open={historyOpen}
        onToggle={(event) => setHistoryOpen(event.currentTarget.open)}
      >
        <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-3 px-4 py-3" aria-labelledby="hp-history-heading">
          <span>
            <span className="block text-xs font-bold uppercase tracking-widest text-primary">HP-Verlauf</span>
            <span id="hp-history-heading" className="mt-1 block text-lg font-bold">Deine Werte</span>
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {checkedDayCount}/{rangeDayCount} {rangeDayCount === 1 ? "Tag" : "Tage"}
          </span>
        </summary>

        <div className="space-y-3 border-t border-base-300 px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm leading-5 text-base-content/65">
              {backendHistoryPoints
                ? "Live gespeicherte Checks fließen in diese Auswertung ein."
                : "Nur tatsächlich gespeicherte Checks fließen in diese Auswertung ein."}
            </p>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {selectedMetric.emoji} {selectedMetric.label}
            </span>
          </div>

          {historyLoadFailed ? (
            <p className="rounded-xl border border-warning/30 bg-warning/10 p-3 text-sm leading-5 text-base-content/70">
              Live-HP-Daten konnten gerade nicht geladen werden. Die lokale Auswertung bleibt als Fallback sichtbar.
            </p>
          ) : null}

          <details className="rounded-xl border border-base-300 bg-base-100/70">
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm font-bold text-base-content">
              <span>Filter</span>
              <span className="text-xs text-base-content/60">{selectedMetric.emoji} {selectedMetric.label} · {historyRanges.find((range) => range.id === historyRange)?.label}</span>
            </summary>
            <div className="grid gap-3 border-t border-base-300 px-3 py-3">
              <label className="grid gap-1 text-xs font-semibold text-base-content/70">
                Zeitraum
                <select
                  className="select select-bordered select-sm w-full"
                  value={historyRange}
                  onChange={(event) => setHistoryRange(event.target.value as HpHistoryRange)}
                >
                  {historyRanges.map((range) => (
                    <option key={range.id} value={range.id}>{range.label}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-xs font-semibold text-base-content/70">
                Wert
                <select
                  className="select select-bordered select-sm w-full"
                  value={historyMetric}
                  onChange={(event) => setHistoryMetric(event.target.value as HpHistoryMetric)}
                >
                  {historyMetrics.map((metric) => (
                    <option key={metric.id} value={metric.id}>{metric.emoji} {metric.label} {metric.shape}</option>
                  ))}
                </select>
              </label>
            </div>
          </details>

          {chartData.length > 0 ? (
            <div className="space-y-3">
              <div className="rounded-xl border border-base-300/70 bg-base-200/40 p-3">
                <div className="mb-2 flex items-center justify-between gap-2 text-xs font-semibold text-base-content/60">
                  <span>Wert 0-100</span>
                  <span>{selectedMetric.emoji} {selectedMetric.label}</span>
                </div>
                <svg viewBox="0 0 120 100" role="img" aria-label={`${selectedMetric.label}-Verlauf mit ${chartData.length} Einträgen`} className="h-36 w-full overflow-visible">
                  <line x1="14" y1="8" x2="14" y2="86" className="stroke-base-content/30" strokeWidth="1.5" />
                  <line x1="14" y1="86" x2="112" y2="86" className="stroke-base-content/30" strokeWidth="1.5" />
                  {[0, 50, 100].map((tick) => {
                    const y = 86 - tick * 0.78;
                    return (
                      <g key={tick}>
                        <line x1="14" y1={y} x2="112" y2={y} className="stroke-base-content/10" strokeWidth="1" />
                        <text x="0" y={y + 3} className="fill-base-content/60 text-[0.45rem]">{tick}</text>
                      </g>
                    );
                  })}
                  {chartData.length > 1 ? (
                    <polyline
                      points={chartData.map((point) => `${14 + point.x * 0.98},${86 - point.value * 0.78}`).join(" ")}
                      fill="none"
                      stroke={selectedMetric.color}
                      strokeDasharray={selectedMetric.dash}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <circle cx="63" cy={86 - chartData[0].value * 0.78} r="4" fill={selectedMetric.color} />
                  )}
                  {chartData.map((point) => (
                    <circle key={`${point.createdAt}-${historyMetric}`} cx={14 + point.x * 0.98} cy={86 - point.value * 0.78} r="3" fill={selectedMetric.color} stroke="currentColor" strokeWidth="1" />
                  ))}
                  <text x="14" y="98" className="fill-base-content/60 text-[0.45rem]">{firstLabel}</text>
                  <text x="112" y="98" textAnchor="end" className="fill-base-content/60 text-[0.45rem]">{lastLabel}</text>
                </svg>
                <div className="mt-1 flex items-center justify-between gap-2 text-xs text-base-content/60">
                  <span>Zeit</span>
                  <span>letzter Wert: {latestChartPoint?.value}/100</span>
                </div>
              </div>
              <p className="text-sm leading-5 text-base-content/65">
                {chartData.length} tatsächlich eingetragene{chartData.length === 1 ? "r" : ""} Check{chartData.length === 1 ? "" : "s"} in diesem Zeitraum für {selectedMetric.label}.
                {chartData.length > 1 ? ` Veränderung: ${trendDelta >= 0 ? "+" : ""}${trendDelta} Punkte.` : ""}
              </p>
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-base-300 bg-base-100/60 p-3 text-sm leading-5 text-base-content/60">
              Für diesen Zeitraum gibt es noch keine HP-Checks.
            </p>
          )}
        </div>
      </details> : null}

      {showAchievements ? <details
        className="rounded-2xl border border-base-300 bg-base-100 shadow-sm"
        open={achievementsOpen}
        onToggle={(event) => setAchievementsOpen(event.currentTarget.open)}
      >
        <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-3 px-4 py-3" aria-labelledby="achievements-heading">
          <span>
            <span className="block text-xs font-bold uppercase tracking-widest text-primary">Meilensteine</span>
            <span id="achievements-heading" className="mt-1 block text-lg font-bold">Achievement-Regal</span>
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">{achievements.length}/{ACHIEVEMENTS.length}</span>
        </summary>

        <div className="space-y-4 border-t border-base-300 px-4 py-4">
          <p className="rounded-xl bg-primary/8 px-3 py-2 text-sm leading-5 text-base-content/65">
            Tippe ein Abzeichen an, dann öffnet sich eine große Detailkarte mit Name, Grund, XP und Datum.
          </p>

          {achievementCategories.map((category) => {
            const categoryAchievements = ACHIEVEMENTS.filter((achievement) => achievement.category === category.id);

            return (
              <details
                key={category.id}
                className={`rounded-xl border ${category.shelfColor}`}
                open={openAchievementCategories[category.id]}
                onToggle={(event) => {
                  const isOpen = event.currentTarget.open;
                  setOpenAchievementCategories((current) => ({
                    ...current,
                    [category.id]: isOpen,
                  }));
                }}
              >
                <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 px-3 py-2">
                  <span className="text-sm font-bold">{category.label}</span>
                  <span className="text-xs font-semibold text-base-content/60">
                    {categoryAchievements.filter((achievement) => unlockedById.has(achievement.id)).length}/{categoryAchievements.length}
                  </span>
                </summary>

                <div className="grid grid-cols-2 gap-2 border-t border-base-300/60 p-3">
                  {categoryAchievements.map((achievement) => {
                    const unlocked = unlockedById.get(achievement.id);
                    const isSelected = selectedAchievementId === achievement.id;

                    return (
                      <button
                        key={achievement.id}
                        type="button"
                        className={`grid min-h-24 place-items-center gap-1 rounded-lg border bg-base-100/90 px-2 py-3 text-center shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isSelected ? "border-primary ring-2 ring-primary/25" : unlocked ? "border-primary/25" : "border-base-300 opacity-70"}`}
                        onClick={() => {
                          setSelectedAchievementId(achievement.id);
                          setAchievementDialogOpen(true);
                        }}
                        aria-pressed={isSelected}
                        aria-label={`${unlocked ? achievement.title : "Offenes Achievement"} ansehen`}
                      >
                        <span className="text-2xl leading-none" aria-hidden="true">{unlocked ? achievement.icon : "?"}</span>
                        <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs font-bold leading-4">{unlocked ? achievement.title : "Offen"}</span>
                      </button>
                    );
                  })}
                </div>
              </details>
            );
          })}

        </div>
      </details> : null}

      {achievementDialogOpen && selectedAchievement ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-base-content/35 px-4 pb-4 pt-16" role="presentation">
          <section
            className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-4 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievement-dialog-heading"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  {selectedUnlockedAchievement ? "Freigeschaltet" : "Noch offen"}
                </p>
                <h2 id="achievement-dialog-heading" className="mt-1 text-xl font-bold leading-6">
                  {selectedAchievement.title}
                </h2>
              </div>
              <button
                type="button"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-lg font-bold"
                onClick={() => setAchievementDialogOpen(false)}
                aria-label="Achievement-Details schließen"
              >
                ×
              </button>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-primary/8 p-3">
              <span className="text-4xl" aria-hidden="true">{selectedUnlockedAchievement ? selectedAchievement.icon : "?"}</span>
              <p className="text-sm leading-5 text-base-content/70">{selectedAchievement.description}</p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl border border-base-300 bg-base-100 px-3 py-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-base-content/55">XP</dt>
                <dd className="mt-1 font-bold text-primary">{selectedUnlockedAchievement ? `+${selectedAchievement.xp}` : `${selectedAchievement.xp} möglich`}</dd>
              </div>
              <div className="rounded-xl border border-base-300 bg-base-100 px-3 py-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-base-content/55">Datum</dt>
                <dd className="mt-1 font-bold">{formatAchievementDate(selectedUnlockedAchievement?.unlockedAt)}</dd>
              </div>
            </dl>
          </section>
        </div>
      ) : null}

      {showAchievements ? (
        <div className="alert border-base-300 bg-base-100 text-sm leading-5 shadow-sm" role="note"><span aria-hidden="true">🌿</span><span>Achievements sind Erinnerungen an deinen Weg – keine Bewertung deiner Leistung.</span></div>
      ) : null}
      <Link to="/profile" className="btn btn-outline min-h-11 w-full">← Zurück zu Ich</Link>
    </section>
  );
}
