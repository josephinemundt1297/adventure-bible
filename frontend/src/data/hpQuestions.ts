import type { HpQuestion } from "../types/hp";

export const hpQuestions: HpQuestion[] = [
  {
    id: "energy-1",
    area: "energy",
    question: "Wie wach fühlst du dich gerade?",
    answerLabels: ["gar nicht wach", "kaum wach", "halbwegs wach", "wach", "sehr wach"],
  },
  {
    id: "energy-2",
    area: "energy",
    question: "Wie leicht könntest du jetzt aufstehen oder dich aufrichten?",
    answerLabels: ["sehr schwer", "eher schwer", "mittel", "eher leicht", "sehr leicht"],
  },
  {
    id: "energy-3",
    area: "energy",
    question: "Wie viel Kraft hast du für eine Aufgabe von 5 Minuten?",
    answerLabels: ["keine Kraft", "wenig Kraft", "etwas Kraft", "genug Kraft", "viel Kraft"],
  },

  {
    id: "mood-1",
    area: "mood",
    question: "Wie ruhig fühlt sich dein Inneres gerade an?",
    answerLabels: ["gar nicht ruhig", "kaum ruhig", "etwas ruhig", "ruhig", "sehr ruhig"],
  },
  {
    id: "mood-2",
    area: "mood",
    question: "Wie freundlich sind deine Gedanken über dich gerade?",
    answerLabels: ["gar nicht freundlich", "kaum freundlich", "etwas freundlich", "freundlich", "sehr freundlich"],
  },
  {
    id: "mood-3",
    area: "mood",
    question: "Wie gut kannst du gerade etwas Angenehmes bemerken?",
    answerLabels: ["gar nicht", "mit Mühe", "manchmal", "recht gut", "sehr gut"],
  },

  {
    id: "focus-1",
    area: "focus",
    question: "Wie klar ist dein Kopf gerade?",
    answerLabels: ["gar nicht klar", "kaum klar", "etwas klar", "klar", "sehr klar"],
  },
  {
    id: "focus-2",
    area: "focus",
    question: "Wie gut kannst du gerade 5 Minuten bei einer Aufgabe bleiben?",
    answerLabels: ["gar nicht", "etwa 1 Minute", "etwa 3 Minuten", "fast 5 Minuten", "die ganzen 5 Minuten"],
  },
  {
    id: "focus-3",
    area: "focus",
    question: "Wie gut kannst du Geräusche, Nachrichten oder Gedanken ausblenden?",
    answerLabels: ["gar nicht", "ein wenig", "teilweise", "meistens", "sehr gut"],
  },

  {
    id: "body-1",
    area: "body",
    question: "Wie angenehm fühlt sich dein Körper gerade an?",
    answerLabels: ["gar nicht angenehm", "kaum angenehm", "etwas angenehm", "angenehm", "sehr angenehm"],
  },
  {
    id: "body-2",
    area: "body",
    question: "Wie frei kannst du Arme, Beine oder Rücken gerade bewegen?",
    answerLabels: ["gar nicht frei", "kaum frei", "etwas frei", "frei", "sehr frei"],
  },
  {
    id: "body-3",
    area: "body",
    question: "Bemerkst du Hunger oder Durst von selbst?",
    answerLabels: ["gar nicht", "erst sehr spät", "manchmal", "meistens", "zuverlässig"],
  },
];

export const hpAreaLabels: Record<HpQuestion["area"], string> = {
  body: "Körper",
  energy: "Energie",
  focus: "Fokus",
  mood: "Stimmung",
  muscles: "Muskelzustand",
  nutrition: "Ernährung",
  recovery: "Regeneration",
};
