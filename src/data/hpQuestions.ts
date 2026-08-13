import type { HpQuestion } from "../types/hp";

export const hpQuestions: HpQuestion[] = [
  { id: "body-1", area: "body", question: "Wie angenehm fühlt sich dein Körper gerade an?" },
  { id: "body-2", area: "body", question: "Wie gut kannst du dich heute körperlich bewegen?" },
  { id: "body-3", area: "body", question: "Wie wohl fühlst du dich gerade in deinem Körper?" },

  { id: "energy-1", area: "energy", question: "Wie viel Energie steht dir gerade zur Verfügung?" },
  { id: "energy-2", area: "energy", question: "Wie leicht fällt es dir, heute aktiv zu werden?" },
  { id: "energy-3", area: "energy", question: "Wie lange glaubst du, dass deine Energie heute reicht?" },

  { id: "focus-1", area: "focus", question: "Wie gut kannst du dich gerade konzentrieren?" },
  { id: "focus-2", area: "focus", question: "Wie leicht fällt es dir, bei einer Sache zu bleiben?" },
  { id: "focus-3", area: "focus", question: "Wie klar fühlt sich dein Kopf gerade an?" },

  { id: "mood-1", area: "mood", question: "Wie fühlt sich deine Stimmung gerade an?" },
  { id: "mood-2", area: "mood", question: "Wie leicht kannst du gerade positive Momente wahrnehmen?" },
  { id: "mood-3", area: "mood", question: "Wie ausgeglichen fühlst du dich gerade?" },

  { id: "muscles-1", area: "muscles", question: "Wie entspannt fühlen sich deine Muskeln gerade an?" },
  { id: "muscles-2", area: "muscles", question: "Wie frei kannst du dich ohne körperliche Spannung bewegen?" },
  { id: "muscles-3", area: "muscles", question: "Wie erholt fühlen sich deine Muskeln gerade an?" },

  { id: "nutrition-1", area: "nutrition", question: "Wie gut bist du heute mit Essen und Trinken versorgt?" },
  { id: "nutrition-2", area: "nutrition", question: "Wie zufrieden bist du gerade mit deiner Versorgung?" },
  { id: "nutrition-3", area: "nutrition", question: "Wie gut fühlt sich dein körperlicher Bedarf gerade gedeckt an?" },

  { id: "recovery-1", area: "recovery", question: "Wie erholt fühlst du dich gerade?" },
  { id: "recovery-2", area: "recovery", question: "Wie gut konntest du in letzter Zeit Pausen oder Schlaf bekommen?" },
  { id: "recovery-3", area: "recovery", question: "Wie viel Raum hast du gerade für Regeneration?" },
];

export const hpAreaLabels: Record<HpQuestion["area"], string> = {
  body: "Körper",
  energy: "Energie",
  focus: "Konzentration",
  mood: "Stimmung",
  muscles: "Muskelzustand",
  nutrition: "Ernährung",
  recovery: "Regeneration",
};

export const hpAnswerLabels = [
  "sehr wenig",
  "wenig",
  "mittel",
  "gut",
  "sehr gut",
] as const;
