import { Breakpoint } from '../../common/themes';

import styled from 'styled-components';

type Props = {
  breakpoint: Breakpoint;
  className?: string;
};

const HideAbove = styled.div<Props>`
  all: inherit;
  width: unset;
  height: unset;
  padding: 0;
  margin: 0;

  @media screen and (min-width: ${(p) => p.breakpoint}) {
    display: none;
  }
`;

export default HideAbove;
