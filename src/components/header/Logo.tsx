import React from 'react';
import styled, { css } from 'styled-components';

import { Palette } from '../../common/themes';
import SharistLogo from '../../resources/images/sharist-logo.svg';
import SharistLogoWhite from '../../resources/images/sharist-logo-white.svg';

const LogoText = styled.span<{ fontColor: Palette }>`
  ${({ fontColor, theme: { palette } }) => css`
    color: ${fontColor};
    font-weight: 300;
    text-shadow: 0 0 0.15rem ${fontColor === palette.REGULAR ? 'none' : palette.GREY};

    &::after {
      content: 'Sharist';
    }
  `}
`;

const LogoIcon = styled.img`
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

export enum LogoType {
  REGULAR,
  MONO_WHITE,
}

type LogoProps = {
  logoType?: LogoType;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function Logo({ logoType = LogoType.REGULAR, onClick }: LogoProps) {
  const logo = logoType === LogoType.MONO_WHITE ? SharistLogoWhite : SharistLogo;
  const color = logoType === LogoType.MONO_WHITE ? Palette.ASH_LIGHTER : Palette.REGULAR;

  return (
    <LogoWrapper onClick={onClick}>
      <LogoIcon src={logo} />
      <LogoText fontColor={color} />
    </LogoWrapper>
  );
}

export default Logo;
