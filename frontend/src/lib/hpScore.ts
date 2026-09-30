import { hpQuestions } from "../data/hpQuestions";
import type { HpAnswer, HpArea, HpState } from "../types/hp";

const MIN_ANSWER = 1;
const MAX_ANSWER = 5;

function toScore(value: number): number {
  return Math.round(((value - MIN_ANSWER) / (MAX_ANSWER - MIN_ANSWER)) * 100);
}

export function calculateHpState(answers: HpAnswer[]): HpState {
  const areas = [...new Set(hpQuestions.map((question) => question.area))].map(
    (area) => {
      const areaQuestions = hpQuestions.filter((question) => question.area === area);
      const areaAnswers = areaQuestions
        .map((question) => answers.find((answer) => answer.questionId === question.id)?.value)
        .filter((value): value is HpAnswer["value"] => value !== undefined);

      const average = areaAnswers.length
        ? areaAnswers.reduce((sum, value) => sum + value, 0) / areaAnswers.length
        : 1;

      return {
        area,
        score: toScore(average),
      };
    },
  );

  const overall = Math.round(
    areas.reduce((sum, area) => sum + area.score, 0) / areas.length,
  );

  return { areas, overall };
}

export function getHpAreaScore(state: HpState, area: HpArea): number {
  return state.areas.find((item) => item.area === area)?.score ?? 0;
}
