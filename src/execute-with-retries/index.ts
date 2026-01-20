/* app imports */
import { TRetryOptions } from "../types/index.js";
import calculateDelayMs from "./calculate-delay.js";

/* module */
async function executeWithRetries<T>(
  fn: () => Promise<T>,
  options?: TRetryOptions
) {
  /* default setup in case we do not have incoming */
  const retries = options?.retries ?? 3;
  const delay = {
    type: options?.delay?.type ?? "fixed",
    ms: options?.delay?.ms ?? 300
  };

  let attempt = 0;

  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      /* update */
      ++attempt;

      /* check and continue */
      if (attempt > retries) {
        throw error;
      } else {
        const delayMs = calculateDelayMs(delay, attempt);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw new Error("All retry attempts failed");
}

/* exports */
export { executeWithRetries };
