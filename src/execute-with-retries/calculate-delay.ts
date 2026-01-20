/* app imports */
import { TDelay } from "../types/index.js";

/* types */
type TInput = TDelay;
type TOutput = number;

/* module */
function calculateDelayMs(delay: TInput, attempt: number): TOutput {
  /* setup */
  const DELAY_FACTOR = 2;
  const DELAY_MAX = 10000;

  /* check and return */
  if (delay.type === "fixed") {
    return delay.ms;
  } else {
    const computed = delay.ms * Math.pow(DELAY_FACTOR, attempt);
    return Math.min(DELAY_MAX, computed);
  }
}

/* exports */
export default calculateDelayMs;
