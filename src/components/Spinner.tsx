import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import { Palette } from '../common/themes';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wheel = styled.div<{ color: Palette; lengthCss: string }>`
  ${({ color, lengthCss }) => css`
    animation: ${spin} 0.75s linear infinite;
    border: 0.175rem solid ${color};
    border-bottom-color: ${Palette.TRANSPARENT};
    border-right-color: ${Palette.TRANSPARENT};
    border-radius: 50%;
    opacity: 0.9;
    padding: ${lengthCss};
  `}
`;

type Props = {
  /** Color of the spinner; defaults to {@link Palette.GREY_DARKER} */
  color?: Palette;

  /** Length multiplier (basis is 1rem). Results in css string  */
  lengthMultiplier?: number;
};

function Spinner({ color = Palette.GREY_DARKER, lengthMultiplier = 1 }: Props) {
  const lengthCss = `calc(${lengthMultiplier} * 0.5rem)`;

  return <Wheel color={color} lengthCss={lengthCss} />;
}

export default Spinner;
