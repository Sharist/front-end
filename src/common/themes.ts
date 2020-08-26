export enum Breakpoints {
  MOBILE = '600px',
  TABLET = '800px',
  REGULAR = '1200px',
}

export enum Palette {
  BLACK = '#000',
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

export enum Typography {
  SMALL = '0.8rem',
  REGULAR = '1rem',
  MEDIUM = '1.2rem',
  LARGE = '1.5rem',
  X_LARGE = '2rem',
  GIANT = '3rem',
}

export const SharistTheme = {
  breakpoints: Breakpoints,
  palette: Palette,
  typography: Typography,
};
