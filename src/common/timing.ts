/**
 * Your friendly neighbourhood debouncer.
 *
 * @param callback Function to debounce
 * @param timeout Timout in milliseconds; defaults to 100.
 */
export function debounce(callback: Function, timeout = 100) {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      callback(...args);
    }, timeout);
  };
}
