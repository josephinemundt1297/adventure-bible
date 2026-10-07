import type { HpCheckArea, HpQuestion } from "../types/hp";

const hpAnswerLabels = ["sehr niedrig", "niedrig", "mittel", "hoch", "sehr hoch"] as const;

export const hpQuestions: HpQuestion[] = [
  {
    id: "energy-1",
    area: "energy",
    question: "Wie hoch ist deine Wachheit gerade?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "energy-2",
    area: "energy",
    question: "Wie hoch ist deine Energie, dich gerade aufzurichten oder loszugehen?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "energy-3",
    area: "energy",
    question: "Wie hoch ist deine Kraft für eine Aufgabe von 5 Minuten gerade?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "energy-4",
    area: "energy",
    question: "Wie hoch ist deine Ausdauer für den nächsten kleinen Schritt gerade?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "energy-5",
    area: "energy",
    question: "Wie hoch ist dein Gefühl von innerem Antrieb gerade?",
    answerLabels: hpAnswerLabels,
  },

  {
    id: "mood-1",
    area: "mood",
    question: "Wie hoch ist deine Fähigkeit, deine Stimmung gerade zu steuern?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "mood-2",
    area: "mood",
    question: "Wie hoch ist deine innere Freundlichkeit dir selbst gegenüber gerade?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "mood-3",
    area: "mood",
    question: "Wie hoch ist deine Offenheit für einen kleinen angenehmen Moment gerade?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "mood-4",
    area: "mood",
    question: "Wie hoch ist deine innere Ruhe und Entlastung gerade?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "mood-5",
    area: "mood",
    question: "Wie hoch ist deine Gelassenheit bei kleinen Reizen heute?",
    answerLabels: hpAnswerLabels,
  },

  {
    id: "focus-1",
    area: "focus",
    question: "Wie hoch ist deine gedankliche Klarheit gerade?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "focus-2",
    area: "focus",
    question: "Wie hoch ist deine Fähigkeit, 5 Minuten bei einer Aufgabe zu bleiben?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "focus-3",
    area: "focus",
    question: "Wie hoch ist deine Fähigkeit, Ablenkungen gerade auszublenden?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "focus-4",
    area: "focus",
    question: "Wie hoch ist deine Fähigkeit, gerade eine Entscheidung zu treffen?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "focus-5",
    area: "focus",
    question: "Wie hoch ist deine Orientierung für den nächsten sinnvollen Schritt gerade?",
    answerLabels: hpAnswerLabels,
  },

  {
    id: "body-1",
    area: "body",
    question: "Wie hoch ist dein Wohlgefühl in deinem Körper gerade?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "body-2",
    area: "body",
    question: "Wie hoch ist deine Beweglichkeit bei einfachen Bewegungen gerade?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "body-3",
    area: "body",
    question: "Wie hoch ist deine Wahrnehmung für Hunger, Durst oder Anspannung gerade?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "body-4",
    area: "body",
    question: "Wie hoch ist dein Gefühl von körperlicher Entspannung gerade?",
    answerLabels: hpAnswerLabels,
  },
  {
    id: "body-5",
    area: "body",
    question: "Wie hoch ist dein Gefühl von körperlicher Stabilität gerade?",
    answerLabels: hpAnswerLabels,
  },
];

export const hpAreaLabels: Record<HpCheckArea, string> = {
  body: "Körper",
  energy: "Energie",
  focus: "Fokus",
  mood: "Stimmung",
};
