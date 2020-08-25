export enum Breakpoints {
  /**  600px */ MOBILE = '600px',
  /**  800px */ TABLET = '800px',
  /** 1200px */ REGULAR = '1200px',
}

export enum Palette {
  CLOUD = '#ddd',
  CLOUD_DARKER = '#aaa',
  CLOUD_LIGHTER = '#eee',
  GREY = '#888',
  GREY_DARKER = '#555',
  PURPLE = '#6f4a8e',
  PURPLE_LIGHTER = '#7b549c',
  REGULAR = '#222',
  TEAL = '#198C8C',
  TEAL_LIGHTER = '#5EAEAE',
}

export enum Spacing {
  NANO = '0.05em',
  MICRO = '0.15em',
  X_SMALL = '0.25em',
  SMALL = '0.5em',
  MEDIUM = '1em',
  LARGE = '1.5em',
  X_LARGE = '2em',
}

export enum Typography {
  SMALL = '0.8rem',
  REGULAR = '0.9rem',
  MEDIUM = '1.15rem',
  LARGE = '1.35rem',
  X_LARGE = '1.8rem',
  GIANT = '3rem',

  LIGHT = '300',
  BOLD = '700',
}

export const SharistTheme = {
  breakpoints: Breakpoints,
  palette: Palette,
  spacing: Spacing,
  typography: Typography,
};
