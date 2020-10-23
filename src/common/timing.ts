/**
 * Your friendly neighbourhood debouncer.
 *
 * @param callback Function to debounce
 * @param timeout Timout in milliseconds; defaults to 100.
 */
export function debounce(callback: Function, timeout = 100) {
  let timeoutId: NodeJS.Timeout;

  return {
    /**
     * Function to cancel currently queued function.
     * If still within timeout, the function will not be executed.
     */
    cancel: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    },
    /**
     * Debounced version of the specified callback.
     */
    debounced: (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        callback(...args);
      }, timeout);
    },
  };
}
