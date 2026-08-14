import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { hpAnswerLabels, hpAreaLabels, hpQuestions } from "../../../data/hpQuestions";
import { calculateHpState } from "../../../lib/hpScore";
import { notifyAchievements } from "../../../lib/rewardNotifications";
import { recordHpCheck } from "../../../lib/achievements";
import { leaveCampfire } from "../../../lib/campfire";
import type { HpAnswer } from "../../../types/hp";

const HP_STATE_KEY = "adventure-bible:hp-state";
const QUEST_PROGRESS_KEY = "adventure-bible:quest-progress";
const MINI_SELECTED_QUEST_KEY = "adventure-bible:mini-selected-quest";

export function HpCheck() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<HpAnswer[]>([]);
  const [completed, setCompleted] = useState(false);
  const [completedState, setCompletedState] = useState<ReturnType<typeof calculateHpState> | null>(null);

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

  function next() {
    if (currentAnswer === undefined) return;
    if (isLastQuestion) {
      const allAnswers = [
        ...answers.filter((answer) => answer.questionId !== question.id),
        { questionId: question.id, value: currentAnswer },
      ];
      const finalState = calculateHpState(allAnswers);
      leaveCampfire();
      sessionStorage.setItem(HP_STATE_KEY, JSON.stringify(finalState));
      sessionStorage.removeItem(QUEST_PROGRESS_KEY);
      sessionStorage.removeItem(MINI_SELECTED_QUEST_KEY);
      notifyAchievements(recordHpCheck());
      setAnswers(allAnswers);
      setCompletedState(finalState);
      setCompleted(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
  }

  if (completed && completedState) {
    return (
      <section className="mx-auto max-w-md space-y-4" aria-labelledby="hp-result-heading">
        <header className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Abenteuerzyklus gestartet</p>
          <h1 id="hp-result-heading" className="text-2xl font-bold tracking-tight">Dein aktueller Zustand</h1>
          <p className="text-sm leading-5 text-base-content/70">Deine Einschätzung ist die Grundlage für eine Quest, die zu deinem aktuellen Zustand passt.</p>
        </header>
        <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body items-center p-4 text-center"><span className="text-sm font-semibold uppercase tracking-wide text-base-content/60">Gesamtzustand</span><span className="text-5xl font-bold text-primary" aria-label={`${completedState.overall} von 100`}>{completedState.overall}</span><span className="text-sm text-base-content/60">von 100</span></div></div>
        <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body gap-3 p-4"><h2 className="text-lg font-semibold">Deine Bereiche</h2><div className="space-y-3">{completedState.areas.map(({ area, score }) => (<div key={area}><div className="mb-1 flex items-center justify-between text-sm"><span>{hpAreaLabels[area]}</span><span className="font-semibold">{score}/100</span></div><progress className="progress progress-primary w-full" value={score} max="100" aria-label={`${hpAreaLabels[area]}: ${score} von 100`} /></div>))}</div></div></div>
        <Link to="/quests" className="btn btn-primary w-full">Meine Quest ansehen</Link>
        <p className="text-center text-xs leading-5 text-base-content/60">Dieser Check ist eine persönliche Einschätzung und keine medizinische Diagnose.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto flex h-full min-h-0 max-w-md flex-col gap-3" aria-labelledby="hp-heading">
      <header className="shrink-0 space-y-1">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Neuer Abenteuerzyklus</p>
        <h1 id="hp-heading" className="text-2xl font-bold leading-tight tracking-tight">Wie geht es dir gerade?</h1>
        <p className="text-sm leading-5 text-base-content/70">Nimm dir kurz Zeit, deinen aktuellen Zustand wahrzunehmen. Es gibt keine richtigen oder falschen Antworten.</p>
      </header>

      <div className="shrink-0" aria-label={`Fortschritt: Frage ${questionIndex + 1} von ${hpQuestions.length}`}>
        <div className="mb-1 flex items-center justify-between text-xs font-semibold"><span>{hpAreaLabels[question.area]}</span><span>Frage {questionIndex + 1} / {hpQuestions.length}</span></div>
        <progress className="progress progress-primary h-2 w-full" value={progress} max="100" />
      </div>

      <section className="card min-h-0 flex-1 border border-base-300 bg-base-100 shadow-sm" aria-labelledby="hp-question">
        <div className="card-body min-h-0 items-center justify-center gap-5 p-5">
          <h2 id="hp-question" className="w-full max-w-sm shrink-0 text-center text-lg font-semibold leading-6">{question.question}</h2>

          <div className="grid w-full max-w-sm gap-3" aria-label="Antwort auswählen">
            {hpAnswerLabels.map((label, index) => {
              const value = (index + 1) as HpAnswer["value"];
              const selected = currentAnswer === value;
              return (
                <button key={label} type="button" aria-pressed={selected} onClick={() => selectAnswer(value)} className={`btn h-11 min-h-11 w-full justify-start px-4 text-left normal-case ${selected ? "btn-primary" : "btn-outline"}`}>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">{value}</span>
                  {label}
                </button>
              );
            })}
          </div>

          <button type="button" className="btn btn-primary h-11 min-h-11 w-full max-w-sm shrink-0" disabled={currentAnswer === undefined} onClick={next}>{isLastQuestion ? "Zustand ansehen" : "Weiter"}</button>
        </div>
      </section>

      <p className="shrink-0 text-center text-xs leading-4 text-base-content/60">Dieser Check ist eine persönliche Einschätzung und keine medizinische Diagnose.</p>
    </section>
  );
}
