import { hpAreaLabels, hpQuestions } from "../data/hpQuestions";
import type { HpAnswer, HpCheckArea, HpState } from "../types/hp";
import type { Quest } from "../types/quest";

const CRITICAL_AREA_SCORE = 35;
const LOW_ANSWER_VALUE = 2;

const supportTips: Record<HpCheckArea, readonly string[]> = {
  body: [
    "Trink einen kleinen Schluck Wasser oder prüfe, ob du Hunger hast.",
    "Bewege dich für eine Minute sehr sanft, ohne Leistung daraus zu machen.",
    "Such dir eine bequemere Position, wenn dein Körper gerade angespannt ist.",
  ],
  energy: [
    "Wähle einen nächsten Schritt, der höchstens fünf Minuten dauert.",
    "Mach kurz Licht, Luft oder Wasser zu deiner ersten Mini-Aufgabe.",
    "Verschiebe alles, was gerade mehr Kraft braucht als du verfügbar hast.",
  ],
  focus: [
    "Lege eine Sache sichtbar vor dich und alles andere kurz zur Seite.",
    "Stell dir einen Timer auf fünf Minuten und beginne nur mit dem Anfang.",
    "Notiere den nächsten Schritt in einem Satz, bevor du loslegst.",
  ],
  mood: [
    "Nimm kurz wahr, was gerade schwer ist, ohne es sofort lösen zu müssen.",
    "Mach einen kleinen Reiz leiser: Ton aus, Licht anpassen oder kurz Abstand nehmen.",
    "Wähle eine freundliche Formulierung für dich selbst, auch wenn der Tag holprig ist.",
  ],
};

export interface CriticalHpSupport {
  area: HpCheckArea;
  areaLabel: string;
  score: number;
  lowQuestions: string[];
  tips: readonly string[];
  quest: Quest | null;
}

export function getCriticalHpSupport(
  state: HpState,
  answers: HpAnswer[],
  availableQuests: Quest[],
): CriticalHpSupport | null {
  const criticalArea = [...state.areas]
    .filter((area) => area.score <= CRITICAL_AREA_SCORE)
    .sort((a, b) => a.score - b.score)[0];

  if (!criticalArea) return null;

  const lowQuestions = hpQuestions
    .filter((question) => question.area === criticalArea.area)
    .filter((question) => {
      const answer = answers.find((item) => item.questionId === question.id);
      return answer !== undefined && answer.value <= LOW_ANSWER_VALUE;
    })
    .map((question) => question.question);

  return {
    area: criticalArea.area,
    areaLabel: hpAreaLabels[criticalArea.area],
    score: criticalArea.score,
    lowQuestions,
    tips: supportTips[criticalArea.area],
    quest: availableQuests.find((quest) => quest.targetArea === criticalArea.area) ?? null,
  };
}
