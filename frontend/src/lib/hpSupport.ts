import { hpAreaLabels, hpQuestions } from "../data/hpQuestions";
import type { HpAnswer, HpCheckArea, HpState } from "../types/hp";
import type { Quest } from "../types/quest";

const CRITICAL_AREA_SCORE = 35;
const LOW_ANSWER_VALUE = 2;
const CRITICAL_HISTORY_KEY = "adventure-bible:critical-hp-history";
const CRITICAL_HISTORY_DAYS = 14;
const MIN_CRITICAL_DAYS_FOR_HELP = 4;

const supportTips: Record<HpCheckArea, readonly string[]> = {
  body: [
    "Trink ein Glas Wasser oder spritz dir kurz kaltes Wasser ins Gesicht.",
    "Dehne Schultern, Nacken oder Rücken für eine Minute sehr sanft.",
    "Leg dich kurz hin oder prüfe, ob Schlaf, Essen oder Wärme gerade wichtiger sind als eine Aufgabe.",
  ],
  energy: [
    "Mach kurz ein Fenster auf oder geh für einen Moment an die frische Luft.",
    "Trink etwas und iss eine Kleinigkeit, wenn dein Körper danach klingt.",
    "Erlaube dir eine echte Pause, bevor du den nächsten Schritt planst.",
  ],
  focus: [
    "Lege Handy oder störende Tabs für fünf Minuten außer Sicht.",
    "Schreib einen einzigen nächsten Schritt auf, ohne die ganze Aufgabe zu planen.",
    "Stell dir einen kurzen Timer und beginne nur mit dem Anfang.",
  ],
  mood: [
    "Hör ein Lieblingslied und mach für diese paar Minuten keine Nebenaufgabe.",
    "Ruf eine vertraute Person an oder schreib ihr eine kurze Nachricht.",
    "Nimm ein Bad, eine warme Dusche oder mach einen anderen beruhigenden Reset.",
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

interface CriticalHpHistoryEntry {
  area: HpCheckArea;
  date: string;
}

export const emotionalSupportContacts = [
  {
    name: "TelefonSeelsorge",
    phone: "0800 111 0 111",
    href: "tel:+498001110111",
    website: "https://www.telefonseelsorge.de/",
  },
] as const;

function getDateKey(date = new Date()) {
  return date.toLocaleDateString("en-CA");
}

function readCriticalHistory(): CriticalHpHistoryEntry[] {
  try {
    const stored = localStorage.getItem(CRITICAL_HISTORY_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is CriticalHpHistoryEntry =>
        typeof entry?.date === "string" && typeof entry?.area === "string",
    );
  } catch {
    localStorage.removeItem(CRITICAL_HISTORY_KEY);
    return [];
  }
}

function isWithinHistoryWindow(entry: CriticalHpHistoryEntry, today: Date) {
  const entryDate = new Date(`${entry.date}T00:00:00`);
  const todayDate = new Date(getDateKey(today));
  const difference = Math.round((todayDate.getTime() - entryDate.getTime()) / 86_400_000);
  return difference >= 0 && difference < CRITICAL_HISTORY_DAYS;
}

export function recordCriticalHpSupport(area: HpCheckArea, today = new Date()): boolean {
  const date = getDateKey(today);
  const recent = readCriticalHistory().filter((entry) => isWithinHistoryWindow(entry, today));
  const withoutDuplicateToday = recent.filter((entry) => !(entry.date === date && entry.area === area));
  const next = [...withoutDuplicateToday, { area, date }];
  localStorage.setItem(CRITICAL_HISTORY_KEY, JSON.stringify(next));

  const distinctCriticalDays = new Set(next.map((entry) => entry.date));
  return distinctCriticalDays.size >= MIN_CRITICAL_DAYS_FOR_HELP;
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
