import { describe, expect, it } from "vitest";
import {
  formatGermanDayWithMonth,
  formatGermanMonthWithYear,
  formatGermanTime,
  formatLongGermanDate,
  formatShortGermanDate,
} from "../src/lib/dateFormat";

const date = new Date("2026-07-28T12:00:00");

describe("dateFormat", () => {
  it("formats a short German date for compact UI", () => {
    expect(formatShortGermanDate(date)).toBe("Di., 28.07.2026");
  });

  it("formats a long German date for journal UI", () => {
    expect(formatLongGermanDate(date)).toBe("Dienstag, 28.07.2026");
  });

  it("formats a German day with written month for calendar details", () => {
    expect(formatGermanDayWithMonth(date)).toBe("Dienstag, 28. Juli");
  });

  it("formats a German month with year for calendar headers", () => {
    expect(formatGermanMonthWithYear(date)).toBe("Juli 2026");
  });

  it("formats German time for journal events", () => {
    expect(formatGermanTime(date)).toBe("12:00");
  });
});
