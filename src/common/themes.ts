import Color from './Color';

export enum Breakpoint {
  MOBILE = '600px',
  TABLET = '800px',
  REGULAR = '1200px',
}

export enum Palette {
  /** Basics */
  BLACK = '#000',
  GREY = '#888888',
  GREY_DARKER = '#6C6C6C',
  GREY_LIGHTER = '#9F9F9F',
  REGULAR = '#373737',
  TRANSPARENT = 'TRANSPARENT',
  WHITE = '#FFF',

  /** Themed */
  ASH = '#EAEAEA',
  ASH_DARKER = '#BBBBBB',
  ASH_LIGHTER = '#EEEEEE',
  ASPHALT = '#373737',
  ASPHALT_DARKER = '#2C2C2C',
  ASPHALT_LIGHTER = '#5F5F5F',
  FOREST = '#9EC05F',
  FOREST_DARKER = '#7E994C',
  FOREST_LIGHTER = '#B1CC7F',
  OCEAN = '#9BD2BF',
  OCEAN_DARKER = '#7CA898',
  OCEAN_LIGHTER = '#AFDBCB',
  SAND = '#EFBE75',
  SAND_DARKER = '#BF985D',
  SAND_LIGHTER = '#F2CB90',
  SUN = '#E36B1D',
  SUN_DARKER = '#B55617',
  SUN_LIGHTER = '#E8894A',
}

// Todo(sam): Rename this and migrate everything to the new Palette
export const NewPalette = {
  /** Basics */
  black: Color.of('#000000'),
  grey: Color.of('#888888'),
  regular: Color.of('#373737'),
  transparent: Color.transparent,
  white: Color.of('#ffffff'),

  /** Themed */
  ash: Color.of('#EAEAEA'),
  asphalt: Color.of('#373737'),
  forest: Color.of('#9EC05F'),
  ocean: Color.of('#9BD2BF'),
  sand: Color.of('#EFBE75'),
  sun: Color.of('#E36B1D'),
};

export enum Typography {
  SMALL = '0.8rem',
  REGULAR = '1rem',
  MEDIUM = '1.2rem',
  LARGE = '1.5rem',
  X_LARGE = '1.8rem',
  XX_LARGE = '2.3rem',
  GIANT = '3rem',
}

export const SharistTheme = {
  breakpoints: Breakpoint,
  palette: Palette,
  typography: Typography,
};

/**
 * Converts a hex colour code to rgba. Returns actual CSS statement (e.g.. 'rgba(0, 0, 0, 1)').
 *
 * @param hexValue Hex value of a colour, can be #fff or #ffffff or fff or ffffff
 * @param alpha Alpha value; 1 if not specified. Value should be between 0 and 1.
 */
export function toRgba(hexValue: string | Palette, alpha: number = 1): string {
  if (alpha < 0 || alpha > 1) {
    throw Error(`Invalid alpha value: ${alpha}`);
  }

  if (hexValue.startsWith('#')) {
    hexValue = hexValue.substr(1);
  }

  if (hexValue.length !== 3 && hexValue.length !== 6) {
    throw Error(`Invalid hex value: ${hexValue}`);
  }

  // Expand if using shorthand hex (e.g. #fee for #ffeeee)
  if (hexValue.length === 3) {
    hexValue = hexValue
      .split('')
      .map((hexDigit) => `${hexDigit}${hexDigit}`)
      .join('');
  }

  if (!hexValue.match(/([0-9]|[a-f]){6}/i)) {
    throw Error(`Invalid hex value: ${hexValue}`);
  }

  const red = parseInt(hexValue.substr(0, 2), 16);
  const green = parseInt(hexValue.substr(2, 2), 16);
  const blue = parseInt(hexValue.substr(4, 2), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
