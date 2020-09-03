import React from 'react';
import styled, { css } from 'styled-components';

import SharistLogo from '../../resources/images/sharist-logo.svg';

const LogoText = styled.span`
  font-weight: 300;

  &::after {
    content: 'Sharist';
  }
`;

const LogoIcon = styled.img.attrs({ src: SharistLogo })`
  ${({ theme: { breakpoints } }) => css`
    height: 2.5rem;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      height: 2rem;
    }
  `}
`;

const LogoWrapper = styled.div.attrs({ className: 'noselect' })`
  ${({ theme: { breakpoints } }) => css`
    align-items: center;
    cursor: pointer;
    display: flex;
    font-size: 2.25rem;
    padding: 0.5rem;

    & > * {
      margin: 0 0.25rem;
    }

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: 1.75rem;
      padding: 0.25rem;

      & > * {
        margin: 0 0.2rem;
      }
    }
  `}
`;

type LogoProps = {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function Logo({ onClick }: LogoProps) {
  return (
    <LogoWrapper onClick={onClick}>
      <LogoIcon />
      <LogoText />
    </LogoWrapper>
  );
}

export default Logo;
