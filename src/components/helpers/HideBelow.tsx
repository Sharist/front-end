import { Breakpoint } from '../../common/themes';

import styled from 'styled-components';

type Props = {
  breakpoint: Breakpoint;
  className?: string;
};

const HideBelow = styled.div<Props>`
  all: inherit;
  width: unset;
  height: unset;
  padding: 0;
  margin: 0;

  @media screen and (max-width: ${(p) => p.breakpoint}) {
    display: none;
  }
`;

export default HideBelow;
