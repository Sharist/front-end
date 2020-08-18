/**
 * Calculates the number of `px` per `rem` as per specified for the `html` component.
 *
 * If the configuration cannot be found, retursn 16.
 *
 * Optionally converts to string and append with `px`.
 *
 * @param withUnit Whether to append `px` or not.
 */
export function getRootPxPerRem(): number {
  const rootElementFontSize = getComputedStyle(document.documentElement).fontSize;
  const parsedNumber = parseInt(rootElementFontSize);
  return isNaN(parsedNumber) ? 16 : parsedNumber;
}

/**
 * Convert pixels, either number or with unit, to rem.
 *
 * Optionally converts to string and append with `rem`.
 *
 * @param pixels Number of pixels
 * @param withUnit Whether to append `rem` unit or not
 */
export function pxToRem(pixels: number | string): number {
  const pxNum = typeof pixels === 'string' ? parseInt(pixels) : pixels;
  return pxNum / getRootPxPerRem();
}
