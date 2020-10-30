type Shade =
  | 0.1
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9
  | 1.1
  | 1.2
  | 1.3
  | 1.4
  | 1.5
  | 1.6
  | 1.7
  | 1.8
  | 1.9;

export default class Color {
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
    this.rgbaString = `rgba(${red}, ${blue}, ${green}, ${alphaValue})`;
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
  public get color(): string {
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
   * Create a new instance with lighter shade by the specified percent.
   *
   * The higher the `shade`, the lighter the new color will be.
   *
   * @param shade Increments of 0.1 between 0 and 2 exclusive, excluding 1.
   */
  public shaded(shade: Shade): Color {
    return new Color(
      this.bound(this.red * shade),
      this.bound(this.green * shade),
      this.bound(this.blue * shade),
      this.alphaValue
    );
  }

  /**
   * Round the number to integer and bound to between 0 and 255, inclusive.
   *
   * @param n Number to bound
   */
  private bound(n: number): number {
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
