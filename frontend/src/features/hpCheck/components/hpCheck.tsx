import { useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import { quests } from "../../../data/quests";
import { hpAreaLabels, hpQuestions } from "../../../data/hpQuestions";
import { saveBackendHpCheck } from "../../../lib/backendHpChecks";
import { saveBackendProfile } from "../../../lib/backendProfile";
import { calculateHpState } from "../../../lib/hpScore";
import { emotionalSupportContacts, getCriticalHpSupport, recordCriticalHpSupport } from "../../../lib/hpSupport";
import { notifyAchievements } from "../../../lib/rewardNotifications";
import { recordHpCheck } from "../../../lib/achievements";
import { leaveCampfire } from "../../../lib/campfire";
import { appendDayJournalEvent } from "../../../lib/dayJournal";
import { addXp } from "../../../lib/progress";
import type { HpAnswer } from "../../../types/hp";

const HP_STATE_KEY = "adventure-bible:hp-state";
const QUEST_PROGRESS_KEY = "adventure-bible:quest-progress";
const MINI_SELECTED_QUEST_KEY = "adventure-bible:mini-selected-quest";
const HP_CHECK_REWARD_XP = 5;

export function HpCheck() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const name = user?.fullName ?? user?.firstName ?? user?.username ?? "Abenteurer";
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<HpAnswer[]>([]);
  const [completed, setCompleted] = useState(false);
  const [completedState, setCompletedState] = useState<ReturnType<typeof calculateHpState> | null>(null);
  const [saveError, setSaveError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [supportDismissed, setSupportDismissed] = useState(false);
  const [showEmotionalSupportContacts, setShowEmotionalSupportContacts] = useState(false);

  const question = hpQuestions[questionIndex];
  const currentAnswer = answers.find((answer) => answer.questionId === question.id)?.value;
  const isLastQuestion = questionIndex === hpQuestions.length - 1;
  const progress = Math.round(((questionIndex + 1) / hpQuestions.length) * 100);

  function selectAnswer(value: HpAnswer["value"]) {
    setAnswers((current) => {
      const withoutCurrent = current.filter((answer) => answer.questionId !== question.id);
      return [...withoutCurrent, { questionId: question.id, value }];
    });
  }

  async function next() {
    if (currentAnswer === undefined) return;
    if (isLastQuestion) {
      const allAnswers = [
        ...answers.filter((answer) => answer.questionId !== question.id),
        { questionId: question.id, value: currentAnswer },
      ];
      const finalState = calculateHpState(allAnswers);
      const criticalSupport = getCriticalHpSupport(finalState, allAnswers, quests);
      setSaving(true);
      setSaveError(false);
      leaveCampfire();
      sessionStorage.setItem(HP_STATE_KEY, JSON.stringify(finalState));
      sessionStorage.removeItem(QUEST_PROGRESS_KEY);
      sessionStorage.removeItem(MINI_SELECTED_QUEST_KEY);
      appendDayJournalEvent({ type: "hp-check", state: finalState });
      addXp(HP_CHECK_REWARD_XP);
      notifyAchievements(recordHpCheck());
      setSupportDismissed(false);
      setShowEmotionalSupportContacts(
        criticalSupport ? recordCriticalHpSupport(criticalSupport.area) : false,
      );

      if (user) {
        try {
          await saveBackendProfile({
            displayName: name,
            characterName: name,
            getToken,
          });
          await saveBackendHpCheck({
            answers: allAnswers,
            getToken,
          });
        } catch {
          setSaveError(true);
        }
      }

      setAnswers(allAnswers);
      setCompletedState(finalState);
      setCompleted(true);
      setSaving(false);
      return;
    }
    setQuestionIndex((current) => current + 1);
  }

  if (completed && completedState) {
    const detectedCriticalSupport = getCriticalHpSupport(completedState, answers, quests);
    const criticalSupport = supportDismissed ? null : detectedCriticalSupport;

    return (
      <section className="mx-auto max-w-md space-y-4" aria-labelledby="hp-result-heading">
        <header className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Abenteuerzyklus gestartet</p>
          <h1 id="hp-result-heading" className="text-2xl font-bold tracking-tight">Dein aktueller Zustand</h1>
          <p className="text-sm leading-5 text-base-content/70">Deine Einschätzung ist die Grundlage für eine Quest, die zu deinem aktuellen Zustand passt.</p>
        </header>
        <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body items-center p-4 text-center"><span className="text-sm font-semibold uppercase tracking-wide text-base-content/60">Gesamtzustand</span><span className="text-5xl font-bold text-primary" aria-label={`${completedState.overall} von 100`}>{completedState.overall}</span><span className="text-sm text-base-content/60">von 100</span></div></div>
        <div className="card border border-primary/20 bg-primary/5 shadow-sm" role="status" aria-live="polite">
          <div className="card-body items-center gap-1 p-4 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Selbstwahrnehmung zählt</span>
            <p className="text-2xl font-bold text-primary">+{HP_CHECK_REWARD_XP} XP</p>
            <p className="text-xs leading-4 text-base-content/60">Du hast kurz bei dir eingecheckt. Das ist ein echter Schritt.</p>
          </div>
        </div>
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body gap-3 p-4">
            <h2 className="text-lg font-semibold">Deine Bereiche</h2>
            <div className="space-y-3">
              {completedState.areas.map(({ area, score }) => {
                const isCritical = detectedCriticalSupport?.area === area;
                return (
                  <div key={area} className={isCritical ? "rounded-xl border border-warning/40 bg-warning/10 p-2" : ""}>
                    <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                      <span className={isCritical ? "font-bold text-warning" : ""}>{hpAreaLabels[area]}</span>
                      <span className={`font-semibold ${isCritical ? "text-warning" : ""}`}>{score}/100</span>
                    </div>
                    <progress
                      className={`progress w-full ${isCritical ? "progress-warning" : "progress-primary"}`}
                      value={score}
                      max="100"
                      aria-label={`${hpAreaLabels[area]}: ${score} von 100${isCritical ? ", kritischer Bereich" : ""}`}
                    />
                    {isCritical ? (
                      <p className="mt-1 text-xs font-semibold text-warning">Braucht gerade besondere Aufmerksamkeit.</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {criticalSupport ? (
          <article className="card border border-warning/30 bg-warning/10 shadow-sm" aria-labelledby="critical-support-heading">
            <div className="card-body gap-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-warning">Sanfter Hinweis</p>
                  <h2 id="critical-support-heading" className="text-lg font-bold">
                    {criticalSupport.areaLabel} wirkt gerade niedrig.
                  </h2>
                  <p className="text-sm leading-5 text-base-content/70">
                    Du musst daraus keine Aufgabe machen. Wenn du möchtest, kannst du dir diesen Bereich kurz anschauen.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm btn-square shrink-0"
                  aria-label="Hinweis schließen"
                  onClick={() => setSupportDismissed(true)}
                >
                  ×
                </button>
              </div>

              {criticalSupport.lowQuestions.length > 0 ? (
                <div className="rounded-xl bg-base-100/70 p-3 text-sm leading-5">
                  <p className="font-semibold">Auffällig bei:</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-base-content/70">
                    {criticalSupport.lowQuestions.slice(0, 2).map((questionText) => (
                      <li key={questionText}>{questionText}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="rounded-xl bg-base-100/70 p-3 text-sm leading-5">
                <p className="font-semibold">Mögliche kleine Hilfe:</p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-base-content/70">
                  {criticalSupport.tips.slice(0, 3).map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>

              {criticalSupport.quest ? (
                <p className="text-sm leading-5 text-base-content/70">
                  Passende Quest: <span className="font-semibold">{criticalSupport.quest.title}</span>
                </p>
              ) : null}

              <div className="flex flex-col gap-2">
                <Link to="/quests" className="btn btn-primary min-h-11 w-full">
                  Ja, passende Quest ansehen
                </Link>
                <button type="button" className="btn btn-ghost min-h-11 w-full" onClick={() => setSupportDismissed(true)}>
                  Gerade nicht
                </button>
              </div>
            </div>
          </article>
        ) : null}
        {showEmotionalSupportContacts ? (
          <section className="card border border-info/30 bg-info/10 shadow-sm" aria-labelledby="support-contacts-heading">
            <div className="card-body gap-3 p-4">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-info">Zusätzliche Unterstützung</p>
                <h2 id="support-contacts-heading" className="text-lg font-bold">
                  Du musst damit nicht allein bleiben.
                </h2>
                <p className="text-sm leading-5 text-base-content/70">
                  Weil in letzter Zeit wiederholt kritische Bereiche aufgetaucht sind, kann ein Gespräch mit einer
                  externen Stelle hilfreich sein. Das ist freiwillig.
                </p>
              </div>
              <div className="space-y-2">
                {emotionalSupportContacts.map((contact) => (
                  <article key={contact.phone} className="rounded-xl bg-base-100/70 p-3 text-sm leading-5">
                    <p className="font-bold">{contact.name}</p>
                    <a className="link link-primary font-semibold" href={contact.href}>{contact.phone}</a>
                    <p><a className="link" href={contact.website} target="_blank" rel="noreferrer">{contact.website}</a></p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        {saveError ? <div className="alert alert-warning text-sm" role="status">Dein HP-Check konnte gerade nicht in der Datenbank gespeichert werden.</div> : null}
        <Link to="/quests" className="btn btn-primary w-full">Meine Quest ansehen</Link>
        <p className="text-center text-xs leading-5 text-base-content/60">Dieser Check ist eine persönliche Einschätzung und keine medizinische Diagnose.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-full max-w-md flex-col gap-3" aria-labelledby="hp-heading">
      <header className="shrink-0 space-y-1">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Neuer Abenteuerzyklus</p>
        <h1 id="hp-heading" className="text-2xl font-bold leading-tight tracking-tight">Wie geht es dir gerade?</h1>
        <p className="text-sm leading-5 text-base-content/70">Nimm dir kurz Zeit, deinen aktuellen Zustand wahrzunehmen. Es gibt keine richtigen oder falschen Antworten.</p>
      </header>

      <div className="shrink-0" aria-label={`Fortschritt: Frage ${questionIndex + 1} von ${hpQuestions.length}`}>
        <div className="mb-1 flex items-center justify-between gap-4 text-xs font-semibold"><span>Kategorie: {hpAreaLabels[question.area]}</span><span className="shrink-0">Frage {questionIndex + 1} / {hpQuestions.length}</span></div>
        <progress className="progress progress-primary h-2 w-full" value={progress} max="100" />
      </div>

      <section className="card shrink-0 border border-base-300 bg-base-100 shadow-sm" aria-labelledby="hp-question">
        <div className="card-body items-center p-4 sm:p-5">
          <h2 id="hp-question" className="w-full max-w-sm text-center text-lg font-semibold leading-6 text-pretty sm:text-xl">{question.question}</h2>

          <div className="mt-4 flex w-full max-w-sm flex-col gap-3" aria-label="Antwort auswählen">
            {question.answerLabels.map((label, index) => {
              const value = (index + 1) as HpAnswer["value"];
              const selected = currentAnswer === value;
              return (
                <button key={`${question.id}-${value}`} type="button" aria-pressed={selected} onClick={() => selectAnswer(value)} className={`btn min-h-12 h-auto w-full justify-start gap-3 whitespace-normal px-4 py-2 text-left normal-case leading-tight ${selected ? "btn-primary" : "btn-outline"}`}>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">{value}</span>
                  <span className="min-w-0">{label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 w-full max-w-sm">
            <button type="button" className="btn btn-primary min-h-12 w-full" disabled={currentAnswer === undefined || saving} onClick={() => void next()}>
              {saving ? (
                <>
                  <span className="loading loading-spinner loading-sm" aria-hidden="true" />
                  Speichern...
                </>
              ) : isLastQuestion ? "Zustand ansehen" : "Weiter"}
            </button>
            {saving ? (
              <p className="mt-2 text-center text-xs font-semibold text-primary" role="status" aria-live="polite">
                Dein HP-Check wird gespeichert.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <p className="shrink-0 text-center text-xs leading-4 text-base-content/60">Dieser Check ist eine persönliche Einschätzung und keine medizinische Diagnose.</p>
    </section>
  );
}
