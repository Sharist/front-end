import Color from './Color';

export enum Breakpoint {
  MOBILE = '600px',
  TABLET = '800px',
  REGULAR = '1200px',
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
