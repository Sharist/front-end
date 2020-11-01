import Color from './Color';

export enum Breakpoint {
  MOBILE = '600px',
  TABLET = '800px',
  REGULAR = '1200px',
}

export enum OldPalette {
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

export const Palette = {
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
