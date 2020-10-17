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
