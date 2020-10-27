import React from 'react';
import styled, { css } from 'styled-components';

import { Palette } from '../../common/themes';
import SharistLogo from '../../resources/images/sharist-logo.svg';
import SharistLogoWhite from '../../resources/images/sharist-logo-white.svg';

const LogoText = styled.span<{ fontColor: Palette }>`
  ${({ fontColor, theme: { palette } }) => css`
    color: ${fontColor};
    font-weight: 300;
    font-size: 1.8rem;
    text-shadow: 0 0 0.15rem ${fontColor === palette.REGULAR ? 'none' : palette.GREY};
    margin-left: 0.5rem;
  `}
`;

const LogoIcon = styled.img`
  height: 2.25rem;
`;

const LogoWrapper = styled.div`
  ${({ onClick }) => css`
    align-items: center;
    cursor: ${onClick ? 'pointer' : ''};
    display: flex;
    height: 100%;
  `}
`;

export enum LogoType {
  REGULAR,
  MONO_WHITE,
}

type LogoProps = {
  className?: string;
  logoType?: LogoType;
  noText?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function Logo({ className, logoType = LogoType.REGULAR, noText = false, onClick }: LogoProps) {
  const logo = logoType === LogoType.MONO_WHITE ? SharistLogoWhite : SharistLogo;
  const color = logoType === LogoType.MONO_WHITE ? Palette.ASH_LIGHTER : Palette.REGULAR;

  return (
    <LogoWrapper className={`${className} noselect`} onClick={onClick}>
      <LogoIcon src={logo} />
      {!noText && <LogoText fontColor={color}>Sharist</LogoText>}
    </LogoWrapper>
  );
}

export default Logo;
