import 'styled-components';

import { SharistTheme } from '../common/themes';

declare module 'styled-components' {
  type Theme = typeof SharistTheme;
  export interface DefaultTheme extends Theme {}
}
