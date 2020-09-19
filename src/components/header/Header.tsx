import React, { useEffect, useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import styled, { css } from 'styled-components';

import { Breakpoint, Palette } from '../../common/themes';
import { HeaderActions } from './HeaderComponents';
import { remToPx } from '../../common/dimensions';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import Button from '../Button';
import HideAbove from '../helpers/HideAbove';
import HideBelow from '../helpers/HideBelow';
import Logo, { LogoType } from './Logo';
import MobileMenu from './MobileMenu';
import routes from '../../routes';

export const HEADER_HEIGHT_REM = 5;

const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  height: ${HEADER_HEIGHT_REM}rem;
  justify-content: space-between;
  margin: auto;
  padding: 0.5rem 1rem;
  transition: padding 1s;
  width: 100%;
`;

const FloatingHeader = styled(HeaderWrapper)`
  background-color: transparent;
  position: fixed;
  top: 0;
`;

const HeaderActionButton = styled(Button)`
  width: 6rem;
  margin: 0 0.5rem;
`;

const LandingMainSectionActionButton = styled(HeaderActionButton).attrs({ transparent: true })`
  ${({ theme: { palette } }) => css`
    width: 4rem;
    color: ${palette.WHITE};
  `}
`;

const MobileMenuHamburgerIcon = styled(IoIosMenu)<{ color: Palette }>`
  ${({ color }) => css`
    color: ${color};
  `}
`;

type Props = {
  className?: string;
  isLanding?: boolean;
};

function Header({ className, isLanding = false }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [translucentHeader, setTranslucentHeader] = useState(isLanding);
  const { signedIn } = useAuthentication({ requestLogin: false });

  useEffect(() => {
    function scrollListener() {
      const isPastFirstSection = window.scrollY > window.innerHeight - remToPx(HEADER_HEIGHT_REM);
      setTranslucentHeader(!isPastFirstSection && isLanding);
    }

    // Customization for the landing page
    if (isLanding) {
      window.addEventListener('scroll', scrollListener);
      return function cleanUp() {
        window.removeEventListener('scroll', scrollListener);
      };
    }
  }, [isLanding]);

  const { signOut, plan, signUp, logIn, home } = routes;

  const ButtonType = translucentHeader ? LandingMainSectionActionButton : HeaderActionButton;
  const headerActions = signedIn ? (
    <>
      <ButtonType onClick={signOut.navigator}>Sign out</ButtonType>
      <ButtonType isPrimary onClick={plan.navigator}>
        Plan
      </ButtonType>
    </>
  ) : (
    <>
      <ButtonType isPrimary onClick={signUp.navigator}>
        Sign up
      </ButtonType>
      <ButtonType onClick={logIn.navigator}>Log in</ButtonType>
    </>
  );

  const logoType = isLanding && translucentHeader ? LogoType.MONO_WHITE : LogoType.REGULAR;
  const UseHeaderWrapper = isLanding ? FloatingHeader : HeaderWrapper;

  return (
    <UseHeaderWrapper className={className}>
      <Logo logoType={logoType} onClick={home.navigator} />
      <HeaderActions>
        <HideBelow breakpoint={Breakpoint.MOBILE}>{headerActions}</HideBelow>

        <HideAbove breakpoint={Breakpoint.MOBILE}>
          <MobileMenuHamburgerIcon
            color={isLanding ? Palette.CLOUD : Palette.REGULAR}
            onClick={() => setMobileMenuOpen(true)}
          />
          <MobileMenu
            onDismiss={() => setMobileMenuOpen(false)}
            visible={mobileMenuOpen}
          ></MobileMenu>
        </HideAbove>
      </HeaderActions>
    </UseHeaderWrapper>
  );
}

export default Header;
