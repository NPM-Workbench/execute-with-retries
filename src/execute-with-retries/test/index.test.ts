/// <reference types="jest" />
import { executeWithRetries } from "../index.js";

describe("executeWithRetries", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  /* #1 */
  it("resolves on first attempt without retries", async () => {
    const fn = jest.fn().mockResolvedValue("ok");

    const result = await executeWithRetries(fn);

    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  /* #2 */
  it("retries failures and resolves when a later attempt succeeds", async () => {
    jest.useFakeTimers();
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail-1"))
      .mockRejectedValueOnce(new Error("fail-2"))
      .mockResolvedValue("ok");

    const promise = executeWithRetries(fn, {
      retries: 3,
      delay: { type: "fixed", ms: 10 }
    });

    await Promise.resolve();
    expect(fn).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(10);
    await Promise.resolve();
    expect(fn).toHaveBeenCalledTimes(2);

    await jest.advanceTimersByTimeAsync(10);
    const result = await promise;

    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  /* #3 */
  it("throws immediately when retries is set to 0", async () => {
    const fn = jest.fn().mockResolvedValue("ok");

    await expect(
      executeWithRetries(fn, { retries: 0 })
    ).rejects.toThrow("All retry attempts failed");
    expect(fn).not.toHaveBeenCalled();
  });

  /* #4 */
  it("throws after all retry attempts fail", async () => {
    jest.useFakeTimers();
    const fn = jest.fn().mockRejectedValue(new Error("always-fail"));

    const promise = executeWithRetries(fn, {
      retries: 2,
      delay: { type: "fixed", ms: 5 }
    });
    const expectation = expect(promise).rejects.toThrow(
      "All retry attempts failed"
    );

    await Promise.resolve();
    await jest.advanceTimersByTimeAsync(5);
    await Promise.resolve();
    await jest.advanceTimersByTimeAsync(5);

    await expectation;
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
