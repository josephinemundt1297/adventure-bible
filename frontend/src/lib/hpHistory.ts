import type { DayJournalEntry, DayJournalEvent } from "../types/dayJournal";
import type { HpCheckArea } from "../types/hp";
import type { BackendHpCheck } from "./backendHpChecks";

export type HpHistoryRange = "day" | "week" | "month" | "year";
export type HpHistoryMetric = "overall" | HpCheckArea;

export interface HpHistoryPoint {
  areas: Record<HpCheckArea, number>;
  createdAt: string;
  overall: number;
}

export interface HpHistoryChartPoint {
  createdAt: string;
  value: number;
  x: number;
  y: number;
}

const rangeDays: Record<HpHistoryRange, number> = {
  day: 1,
  week: 7,
  month: 31,
  year: 366,
};

function average(values: number[]) {
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function isValidScore(value: number): boolean {
  return Number.isFinite(value) && value >= 0 && value <= 100;
}

function eventToPoint(event: DayJournalEvent): HpHistoryPoint | null {
  if (event.type === "hp-check") {
    const areas = Object.fromEntries(event.state.areas.map(({ area, score }) => [area, score])) as Record<HpCheckArea, number>;
    if (!isValidScore(event.state.overall)) return null;

    return {
      areas,
      createdAt: event.createdAt,
      overall: event.state.overall,
    };
  }

  if (event.type === "mini-hp-check") {
    const areas = Object.fromEntries(event.state.values.map(({ area, value }) => [area, value])) as Record<HpCheckArea, number>;
    const values = Object.values(areas).filter(isValidScore);
    if (!values.length) return null;

    return {
      areas,
      createdAt: event.createdAt,
      overall: average(values),
    };
  }

  return null;
}

export function collectHpHistoryPoints(journals: DayJournalEntry[]): HpHistoryPoint[] {
  return journals
    .flatMap((journal) => journal.events)
    .map(eventToPoint)
    .filter((point): point is HpHistoryPoint => point !== null)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function collectBackendHpHistoryPoints(hpChecks: BackendHpCheck[]): HpHistoryPoint[] {
  return hpChecks
    .map((hpCheck) => ({
      areas: {
        body: hpCheck.body,
        energy: hpCheck.energy,
        focus: hpCheck.focus,
        mood: hpCheck.mood,
      },
      createdAt: hpCheck.createdAt,
      overall: hpCheck.overallScore,
    }))
    .filter((point) => {
      return (
        isValidScore(point.overall) &&
        Object.values(point.areas).every(isValidScore)
      );
    })
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function filterHpHistoryPoints(
  points: HpHistoryPoint[],
  range: HpHistoryRange,
  now = new Date(),
): HpHistoryPoint[] {
  const earliest = new Date(now);
  earliest.setDate(earliest.getDate() - rangeDays[range] + 1);
  earliest.setHours(0, 0, 0, 0);

  return points.filter((point) => {
    const createdAt = new Date(point.createdAt);
    return createdAt >= earliest && createdAt <= now;
  });
}

function dateKey(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-CA");
}

function isLeapYear(year: number): boolean {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

export function getHpHistoryRangeDayCount(range: HpHistoryRange, now = new Date()): number {
  if (range === "day") return 1;
  if (range === "week") return 7;
  if (range === "month") {
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }
  return isLeapYear(now.getFullYear()) ? 366 : 365;
}

export function countHpHistoryCheckDays(points: HpHistoryPoint[]): number {
  return new Set(points.map((point) => dateKey(point.createdAt))).size;
}

export function getHpHistoryValue(point: HpHistoryPoint, metric: HpHistoryMetric): number {
  return metric === "overall" ? point.overall : point.areas[metric];
}

export function buildHpHistoryChartPoints(
  points: HpHistoryPoint[],
  metric: HpHistoryMetric,
): HpHistoryChartPoint[] {
  const validPoints = points.filter((point) => isValidScore(getHpHistoryValue(point, metric)));

  return validPoints.map((point, index) => {
    const value = getHpHistoryValue(point, metric);
    return {
      createdAt: point.createdAt,
      value,
      x: validPoints.length <= 1 ? 50 : (index / (validPoints.length - 1)) * 100,
      y: 100 - value,
    };
  });
}
