/// <reference types="jest" />
import calculateDelayMs from "../calculate-delay.js";

describe("calculateDelayMs", () => {
  /* #1 */
  it("returns fixed delay milliseconds for fixed type", () => {
    const delay = { type: "fixed", ms: 750 } as const;

    expect(calculateDelayMs(delay, 0)).toBe(750);
    expect(calculateDelayMs(delay, 3)).toBe(750);
  });

  /* #2 */
  it("computes exponential delay based on attempt", () => {
    const delay = { type: "exponential", ms: 500 } as const;

    expect(calculateDelayMs(delay, 0)).toBe(500);
    expect(calculateDelayMs(delay, 1)).toBe(1000);
    expect(calculateDelayMs(delay, 2)).toBe(2000);
  });

  /* #3 */
  it("caps exponential delay at 10000ms", () => {
    const delay = { type: "exponential", ms: 1500 } as const;

    expect(calculateDelayMs(delay, 3)).toBe(10000);
  });
});
