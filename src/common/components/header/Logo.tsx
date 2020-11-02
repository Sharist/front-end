import React from 'react';
import styled, { css } from 'styled-components';

import SharistLogo from '../../../resources/images/sharist-logo.svg';
import SharistLogoWhite from '../../../resources/images/sharist-logo-white.svg';

const LogoText = styled.span<{ dark: boolean }>`
  ${({ dark, theme: { palette } }) => css`
    color: ${dark ? palette.regular.css : palette.ash.lighter.css};
    font-weight: 300;
    font-size: 1.8rem;
    text-shadow: 0 0 0.15rem ${dark ? 'none' : palette.grey.css};
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

  return (
    <LogoWrapper className={`${className} noselect`} onClick={onClick}>
      <LogoIcon src={logo} />
      {!noText && <LogoText dark={logoType === LogoType.REGULAR}>Sharist</LogoText>}
    </LogoWrapper>
  );
}

export default Logo;
