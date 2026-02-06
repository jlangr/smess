import {jest} from "@jest/globals";
import {isEnabled} from "../../src/students/a.mjs";
import dayjs from "dayjs";

describe("isEnabled", () => {
  beforeAll(() => {
    // jest.useFakeTimers();
    // jest.setSystemTime(new Date("2026-01-07T00:00:00Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const todayDayjs = dayjs()
  const today = todayDayjs.format("YYYY-MM-DD")
  const yesterday = todayDayjs.subtract(1, 'day').format("YYYY-MM-DD");
  const tomorrow = todayDayjs.add(1, 'day').format("YYYY-MM-DD");

  test("returns true when enabled date is in the past and no disable date provided (string)", () => {
    expect(isEnabled(yesterday)).toBe(true);
  });

  test("returns true when enabled date is in the past and disable date is in the future (Date args)", () => {
    expect(isEnabled(yesterday, tomorrow)).toBe(true);
  });

  test("returns true when enabled date is today and no disable date provided", () => {
    expect(isEnabled(today)).toBe(true);
  });

  test("returns false when enabled date is in the future", () => {
    expect(isEnabled(tomorrow)).toBe(false);
  });

  test("returns false when enabled date is in the past but disable date is today (not > today)", () => {
    expect(isEnabled(yesterday, today)).toBe(false);
  });

  test("returns false when both enabled and disabled dates are in the past", () => {
    expect(isEnabled(todayDayjs.subtract(7, 'day'), yesterday)).toBe(false);
  });
});
