import 'styled-components';

import { SharistTheme } from '../common/styles/Theme';

declare module 'styled-components' {
  type Theme = SharistTheme;
  export interface DefaultTheme extends Theme {}
}
