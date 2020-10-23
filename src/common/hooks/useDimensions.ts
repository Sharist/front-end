import { useEffect, useState } from 'react';

import { debounce } from '../timing';

interface Config {
  /** The element to check when window is resized. Defaults to `document.documentElement`. */
  element?: HTMLElement;
  /** Debouncer timeout for debouncing the resize callback. Defaults to 100. */
  debounceTimeout?: number;
}

/**
 * Listens to dimension change of an element. Returns the number of pixels.
 */
export function useDimensions(config: Config = {}) {
  const useConfig = {
    element: document.documentElement as HTMLElement,
    debounceTimeout: 100,
    ...config,
  };

  const { element, debounceTimeout } = useConfig;

  const [dimensions, setDimensions] = useState({
    width: Math.floor(element.clientWidth),
    height: Math.floor(element.clientHeight),
  });

  useEffect(
    () => {
      function handleDimensionChange() {
        const newDimensions = {
          width: Math.floor(element.clientWidth),
          height: Math.floor(element.clientHeight),
        };

        if (
          dimensions.width !== newDimensions.width ||
          dimensions.height !== newDimensions.height
        ) {
          setDimensions(newDimensions);
        }
      }

      const handler =
        debounceTimeout > 0
          ? debounce(handleDimensionChange, debounceTimeout).debounced
          : handleDimensionChange;

      window.addEventListener('resize', handler);

      return function cleanUp() {
        window.removeEventListener('resize', handler);
      };
    },
    // Do NOT add `dimensions` state to the dependency, as this will cause the hook
    // to execute twice every time there's a resize
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [element]
  );

  return dimensions;
}
