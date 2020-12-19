/**
 * Creates a new function that negates the boolean result
 * of the supplied predicate function.
 *
 * @param fn Predicate function to negate.
 */
export function not<T>(fn: (test: T) => boolean) {
  return function negated(test: T) {
    return !fn(test);
  };
}

/**
 * Assert that the supplied value is neither `null` nor `undefined`.
 *
 * @param value Value to test for nullishness.
 */
export function notNullish<T>(value?: T | null): value is T {
  return value !== null && value !== undefined;
}
