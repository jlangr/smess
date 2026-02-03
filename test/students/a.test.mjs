import dayjs from "dayjs";
import { jest } from "@jest/globals";
import { isEnabled } from "../../src/students/a.mjs";

describe("isEnabled", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-01-07T00:00:00Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("returns true when enabled date is in the past and no disable date provided (string)", () => {
    expect(isEnabled("2026-01-06")).toBe(true);
  });

  test("returns true when enabled date is in the past and disable date is in the future (Date args)", () => {
    expect(isEnabled(new Date("2026-01-06"), new Date("2026-01-08"))).toBe(
      true,
    );
  });

  test.only("returns true when enabled date is today and no disable date provided", () => {
    expect(isEnabled("2026-01-07")).toBe(true);
  });

  test("returns false when enabled date is in the future", () => {
    expect(isEnabled("2026-01-08")).toBe(false);
  });

  test("returns false when enabled date is in the past but disable date is today (not > today)", () => {
    expect(isEnabled("2026-01-06", "2026-01-07")).toBe(false);
  });

  test("returns false when both enabled and disabled dates are in the past", () => {
    expect(isEnabled("2026-01-01", "2026-01-05")).toBe(false);
  });
});
