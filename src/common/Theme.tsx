import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import Color from './Color';

enum Breakpoint {
  MOBILE = '600px',
  TABLET = '800px',
  REGULAR = '1200px',
  WIDE = '1600px',
  ULTRAWIDE = '2000px',
}

const Palette = {
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

enum Typography {
  SMALL = '0.8rem',
  REGULAR = '1rem',
  MEDIUM = '1.2rem',
  LARGE = '1.5rem',
  X_LARGE = '1.8rem',
  XX_LARGE = '2.3rem',
  GIANT = '3rem',
}

export interface SharistTheme {
  breakpoints: typeof Breakpoint;
  palette: typeof Palette;
  typography: typeof Typography;
}

type Props = {
  children: ReactNode;
};

function SharistThemeProvider({ children }: Props) {
  return (
    <ThemeProvider
      theme={
        {
          breakpoints: Breakpoint,
          palette: Palette,
          typography: Typography,
        } as SharistTheme
      }
    >
      {children}
    </ThemeProvider>
  );
}

export default SharistThemeProvider;
