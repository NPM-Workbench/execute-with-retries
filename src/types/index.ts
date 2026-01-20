/* types */
export type TDelay = { type:"fixed" | "exponential", ms:number };
export type TRetries = number;
export type TRetryOptions = { retries?: TRetries, delay?: TDelay };
