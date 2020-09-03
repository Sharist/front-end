export enum Breakpoint {
  MOBILE = '600px',
  TABLET = '800px',
  REGULAR = '1200px',
}

export enum Palette {
  /** Basics */
  BLACK = '#000',
  GREY = '#888',
  GREY_DARKER = '#555',
  TRANSPARENT = 'TRANSPARENT',
  WHITE = '#FFF',

  /** Themed */
  AMBER = '#EFBE75',
  AMBER_DARKER = '#A78551',
  AMBER_LIGHTER = '#F3D19E',
  CLOUD = '#EAEAEA',
  CLOUD_DARKER = '#A3A3A3',
  CLOUD_LIGHTER = '#F0F0F0',
  GREEN = '#9EC05F',
  ORANGE = '#E36B1D',
  ORANGE_DARKER = '#9E4B14',
  ORANGE_LIGHTER = '#EB9860',
  REGULAR = '#373737',
  TORQUOISE = '#9BD2BF',
  TORQUOISE_DARKER = '#6C9385',
  TORQUOISE_LIGHTER = '#B9DFD2',
}

export enum Typography {
  SMALL = '0.8rem',
  REGULAR = '1rem',
  MEDIUM = '1.2rem',
  LARGE = '1.5rem',
  X_LARGE = '2rem',
  GIANT = '3rem',
}

export const SharistTheme = {
  breakpoints: Breakpoint,
  palette: Palette,
  typography: Typography,
};
