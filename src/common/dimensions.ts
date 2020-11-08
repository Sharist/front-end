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
  const parsedNumber = parseFloat(rootElementFontSize);
  return isNaN(parsedNumber) ? 16 : parsedNumber;
}

/**
 * Convert pixels, either number or with unit, to rems.
 *
 * @param pixels Number of pixels
 */
export function pxToRem(pixels: number | string): number {
  const pxNum = parseFloat(pixels.toString());
  return pxNum / getRootPxPerRem();
}

/**
 * Convert rems, either number or with unit, to pixels.
 *
 * @param pixels Number of pixels
 */
export function remToPx(rems: number | string): number {
  const remNum = parseFloat(rems.toString());
  return remNum * getRootPxPerRem();
}
