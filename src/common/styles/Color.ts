export default class Color {
  private static step = 0.2;

  private readonly rgbaString: string;

  public static get transparent() {
    return new Color(255, 255, 255, 0);
  }

  public constructor(
    private readonly red: number,
    private readonly green: number,
    private readonly blue: number,
    private readonly alphaValue = 1
  ) {
    this.assertValue(red, green, blue, alphaValue);
    this.rgbaString = `rgba(${red}, ${green}, ${blue}, ${alphaValue})`;
  }

  /**
   * Convert hex colour string to decimal red, gree, and blue values for the class.
   *
   * Alpha is set to 1.
   *
   * @param hex Hexadecimal colour code, e.g. `'#ffffff'` or `'#fff'`.
   */
  public static of(hex: string) {
    if (hex.startsWith('#')) {
      hex = hex.substr(1);
    }

    if (hex.length !== 3 && hex.length !== 6) {
      throw Error(`Invalid hex value: ${hex}`);
    }

    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((hexDigit) => `${hexDigit}${hexDigit}`)
        .join('');
    }

    return new Color(
      parseInt(hex.substr(0, 2), 16),
      parseInt(hex.substr(2, 2), 16),
      parseInt(hex.substr(4, 2), 16)
    );
  }

  /**
   * Return the rgba string of this instance, in the form of `'rgba([R],[G],[B],[A])'`.
   */
  public get css(): string {
    return this.rgbaString;
  }

  /**
   * Return a Color instance with the alpha applied.
   *
   * @param alpha Alpha value, must be between 0 and 1 inclusive.
   */
  public alpha(alpha: number = 1): Color {
    return new Color(this.red, this.green, this.blue, alpha);
  }

  /**
   * Darken this `Color` by `degree` times.
   *
   * @param degree Multiplier for darkening the colour.
   */
  public darkenBy(degree: number = 1): Color {
    let [r, g, b] = [this.red, this.green, this.blue];
    while (degree-- > 0) {
      [r, g, b] = Color.shade(r, g, b);
    }

    return new Color(r, g, b, this.alphaValue);
  }

  /**
   * Lighten this `Color` by `degree` times.
   *
   * @param degree Multiplier for lightening the colour.
   */
  public lightenBy(degree: number = 1): Color {
    let [r, g, b] = [this.red, this.green, this.blue];
    while (degree-- > 0) {
      [r, g, b] = Color.tint(r, g, b);
    }

    return new Color(r, g, b, this.alphaValue);
  }

  /**
   * Get the darker colour (by 1 degree).
   */
  public get darker() {
    return this.darkenBy();
  }

  /**
   * Get the lighter colour (by 1 degree).
   */
  public get lighter() {
    return this.lightenBy();
  }

  /**
   * Add a shade (darker mask) to this color.
   *
   * @see https://stackoverflow.com/a/31325812
   */
  private static shade(r: number, g: number, b: number) {
    return [r, g, b].map((c) => c * (1 - Color.step)).map(Color.bound);
  }

  /**
   * Add a tint (lighter mask) to this color.
   *
   * @see https://stackoverflow.com/a/31325812
   */
  private static tint(r: number, g: number, b: number) {
    return [r, g, b].map((c) => c + (255 - c) * Color.step).map(Color.bound);
  }

  /**
   * Round the number to integer and bound to between 0 and 255, inclusive.
   *
   * @param n Number to bound
   */
  private static bound(n: number): number {
    const rounded = Math.round(n);
    if (rounded > 255) {
      return 255;
    } else if (rounded < 0) {
      return 0;
    } else {
      return rounded;
    }
  }

  private assertValue(red: number, green: number, blue: number, alpha: number) {
    function throwIfOutOfBound(n: number, colorName: string) {
      if (n < 0 || n > 255) {
        throw new Error(`${colorName} is out of bound: ${n}, should be [0, 255].`);
      }
    }

    throwIfOutOfBound(red, 'red');
    throwIfOutOfBound(green, 'green');
    throwIfOutOfBound(blue, 'blue');

    if (alpha < 0 || alpha > 1) {
      throw new Error(`Invalid alpha value: ${alpha}, should be [0, 1].`);
    }
  }
}
