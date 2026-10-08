import { describe, expect, it } from "vitest";
import {
  buildHpHistoryChartPoints,
  collectBackendHpHistoryPoints,
  collectHpHistoryPoints,
  countHpHistoryCheckDays,
  filterHpHistoryPoints,
  getHpHistoryRangeDayCount,
} from "../src/lib/hpHistory";
import type { BackendHpCheck } from "../src/lib/backendHpChecks";
import type { DayJournalEntry } from "../src/types/dayJournal";

const journals: DayJournalEntry[] = [
  {
    date: "2026-10-01",
    events: [
      {
        id: "hp-1",
        createdAt: "2026-10-01T08:00:00.000Z",
        type: "hp-check",
        state: {
          overall: 40,
          areas: [
            { area: "energy", score: 20 },
            { area: "focus", score: 50 },
            { area: "mood", score: 40 },
            { area: "body", score: 50 },
          ],
        },
      },
    ],
  },
  {
    date: "2026-10-07",
    events: [
      {
        id: "mini-1",
        createdAt: "2026-10-07T14:00:00.000Z",
        type: "mini-hp-check",
        state: {
          completedAt: "2026-10-07T14:00:00.000Z",
          values: [
            { area: "energy", value: 60 },
            { area: "focus", value: 70 },
            { area: "mood", value: 80 },
            { area: "body", value: 90 },
          ],
        },
      },
    ],
  },
];

describe("hpHistory", () => {
  it("collects full and mini HP checks as history points", () => {
    const points = collectHpHistoryPoints(journals);

    expect(points).toHaveLength(2);
    expect(points[0].overall).toBe(40);
    expect(points[1].overall).toBe(75);
  });

  it("filters points by the selected range", () => {
    const points = collectHpHistoryPoints(journals);
    const visible = filterHpHistoryPoints(points, "week", new Date("2026-10-07T16:00:00.000Z"));

    expect(visible.map((point) => point.overall)).toEqual([40, 75]);
  });

  it("keeps only actual check entries and does not create values for unused days", () => {
    const points = collectHpHistoryPoints(journals);
    const visible = filterHpHistoryPoints(points, "month", new Date("2026-10-07T16:00:00.000Z"));

    expect(visible).toHaveLength(2);
    expect(visible.map((point) => point.createdAt)).toEqual([
      "2026-10-01T08:00:00.000Z",
      "2026-10-07T14:00:00.000Z",
    ]);
  });

  it("ignores missing category values for a selected metric", () => {
    const chartPoints = buildHpHistoryChartPoints(
      [
        {
          areas: { energy: 80 } as never,
          createdAt: "2026-10-07T10:00:00.000Z",
          overall: 80,
        },
      ],
      "body",
    );

    expect(chartPoints).toEqual([]);
  });

  it("counts only days with actual checks", () => {
    const points = collectHpHistoryPoints(journals);

    expect(countHpHistoryCheckDays(points)).toBe(2);
  });

  it("collects backend HP checks as history points", () => {
    const points = collectBackendHpHistoryPoints([
      {
        id: "backend-hp-1",
        userProfileId: "profile-1",
        type: "FULL",
        body: 70,
        energy: 30,
        focus: 45,
        mood: 75,
        overallScore: 55,
        createdAt: "2026-10-08T07:30:00.000Z",
      },
    ] satisfies BackendHpCheck[]);

    expect(points).toEqual([
      {
        areas: {
          body: 70,
          energy: 30,
          focus: 45,
          mood: 75,
        },
        createdAt: "2026-10-08T07:30:00.000Z",
        overall: 55,
      },
    ]);
  });

  it("returns dynamic day counts for selected ranges", () => {
    expect(getHpHistoryRangeDayCount("day", new Date("2026-10-07T10:00:00"))).toBe(1);
    expect(getHpHistoryRangeDayCount("week", new Date("2026-10-07T10:00:00"))).toBe(7);
    expect(getHpHistoryRangeDayCount("month", new Date("2026-02-07T10:00:00"))).toBe(28);
    expect(getHpHistoryRangeDayCount("year", new Date("2026-10-07T10:00:00"))).toBe(365);
    expect(getHpHistoryRangeDayCount("year", new Date("2028-10-07T10:00:00"))).toBe(366);
  });
});
