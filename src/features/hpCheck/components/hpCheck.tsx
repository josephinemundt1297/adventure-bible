import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { hpAnswerLabels, hpAreaLabels, hpQuestions } from "../../../data/hpQuestions";
import { calculateHpState } from "../../../lib/hpScore";
import type { HpAnswer } from "../../../types/hp";

const HP_STATE_KEY = "adventure-bible:hp-state";

export function HpCheck() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<HpAnswer[]>([]);
  const [completed, setCompleted] = useState(false);
  const [completedState, setCompletedState] = useState<ReturnType<typeof calculateHpState> | null>(null);

  const question = hpQuestions[questionIndex];
  const currentAnswer = answers.find((answer) => answer.questionId === question.id)?.value;
  const isLastQuestion = questionIndex === hpQuestions.length - 1;
  const progress = Math.round(((questionIndex + 1) / hpQuestions.length) * 100);
  const state = useMemo(() => calculateHpState(answers), [answers]);

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

      sessionStorage.setItem(HP_STATE_KEY, JSON.stringify(finalState));
      setAnswers(allAnswers);
      setCompletedState(finalState);
      setCompleted(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
  }

  if (completed && completedState) {
    return (
      <section className="mx-auto max-w-md space-y-5" aria-labelledby="hp-result-heading">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Abenteuerzyklus gestartet
          </p>
          <h1 id="hp-result-heading" className="text-2xl font-bold tracking-tight">
            Dein aktueller Zustand
          </h1>
          <p className="text-sm leading-6 text-base-content/70">
            Deine Einschätzung ist die Grundlage für eine Quest, die zu deinem aktuellen Zustand passt.
          </p>
        </header>

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-base-content/60">
              Gesamtzustand
            </span>
            <span className="text-5xl font-bold text-primary" aria-label={`${completedState.overall} von 100`}>
              {completedState.overall}
            </span>
            <span className="text-sm text-base-content/60">von 100</span>
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <h2 className="text-lg font-semibold">Deine Bereiche</h2>
            <div className="space-y-4">
              {completedState.areas.map(({ area, score }) => (
                <div key={area}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>{hpAreaLabels[area]}</span>
                    <span className="font-semibold">{score}/100</span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={score}
                    max="100"
                    aria-label={`${hpAreaLabels[area]}: ${score} von 100`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link to="/quests" className="btn btn-primary w-full">
          Meine Quest ansehen
        </Link>

        <p className="text-center text-xs leading-5 text-base-content/60">
          Dieser Check ist eine persönliche Einschätzung und keine medizinische Diagnose.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md space-y-5" aria-labelledby="hp-heading">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Neuer Abenteuerzyklus</p>
        <h1 id="hp-heading" className="text-2xl font-bold tracking-tight">Wie geht es dir gerade?</h1>
        <p className="text-sm leading-6 text-base-content/70">
          Nimm dir kurz Zeit, deinen aktuellen Zustand wahrzunehmen. Es gibt keine richtigen oder falschen Antworten.
        </p>
      </header>

      <div aria-label={`Fortschritt: Frage ${questionIndex + 1} von ${hpQuestions.length}`}>
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span>{hpAreaLabels[question.area]}</span>
          <span>Frage {questionIndex + 1} / {hpQuestions.length}</span>
        </div>
        <progress className="progress progress-primary w-full" value={progress} max="100" />
      </div>

      <fieldset className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-4">
          <legend className="text-lg font-semibold leading-7">{question.question}</legend>

          <div className="grid gap-2" role="radiogroup" aria-label="Antwort auswählen">
            {hpAnswerLabels.map((label, index) => {
              const value = (index + 1) as HpAnswer["value"];
              const selected = currentAnswer === value;

              return (
                <button
                  key={label}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => selectAnswer(value)}
                  className={`btn h-auto min-h-12 justify-start px-4 text-left normal-case ${selected ? "btn-primary" : "btn-outline"}`}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                    {value}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="btn btn-primary mt-2 w-full"
            disabled={currentAnswer === undefined}
            onClick={next}
          >
            {isLastQuestion ? "Zustand ansehen" : "Weiter"}
          </button>
        </div>
      </fieldset>

      <p className="text-center text-xs leading-5 text-base-content/60">
        Dieser Check ist eine persönliche Einschätzung und keine medizinische Diagnose.
      </p>
    </section>
  );
}
