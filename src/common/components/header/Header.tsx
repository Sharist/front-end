import React, { useEffect, useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import styled, { css } from 'styled-components';

import { mixins } from '../../styles/Theme';
import { remToPx } from '../../dimensions';
import { useAuthentication } from '../../hooks/useAuthentication';
import Button from '../Button';
import Logo, { LogoType } from './Logo';
import MobileMenu from './MobileMenu';
import routes from '../../../routes';

export const HEADER_HEIGHT_REM = 4.5;

const HeaderWrapper = styled.div<{ translucent: boolean }>`
  ${({ translucent, theme: { palette } }) => css`
    align-items: center;
    background-color: ${translucent ? palette.transparent.css : palette.white.css};
    box-shadow: 0 0 0.1rem ${palette.grey.css};
    display: flex;
    height: ${HEADER_HEIGHT_REM}rem;
    justify-content: space-between;
    margin: auto;
    padding: 1rem 1.25rem;
    position: relative;
    transition: padding 1s, background-color 300ms;
    width: 100%;
  `}
`;

const FloatingHeader = styled(HeaderWrapper)`
  position: fixed;
  top: 0;
  box-shadow: none;
`;

const HeaderActionButton = styled(Button)`
  margin: 0 0.5rem;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const LandingMainSectionActionButton = styled(HeaderActionButton).attrs({ transparent: true })`
  ${({ theme: { palette } }) => css`
    color: ${palette.ash.css};
    width: 4rem;

    &:hover,
    &:focus {
      color: ${palette.white.css};
      text-shadow: 0 0 0.02rem ${palette.white.css};
    }

    &:active {
      border-color: ${palette.transparent.css};
      color: ${palette.ash.lighter.css};
      text-shadow: 0 0 0.05rem ${palette.ash.lighter.css};
    }
  `}
`;

const MobileMenuHamburgerIcon = styled.div<{ darkIcon: boolean }>`
  ${({ darkIcon, theme: { palette } }) => css`
    align-items: center;
    color: ${darkIcon ? palette.regular.css : palette.ash.css};
    display: flex;
  `}
`;

const HeaderActions = styled.div<{ forMobile?: boolean }>`
  ${({ forMobile = false }) => css`
    align-items: center;
    display: flex;
    justify-content: space-around;

    ${mixins.belowMobile} {
      font-size: 2rem;
      padding: 0.25rem;
      width: unset;
      display: ${forMobile ? '' : 'none'};
    }

    ${mixins.aboveMobile} {
      display: ${forMobile ? 'none' : ''};
    }
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

  const { signOut, tripList, signUp, logIn, home } = routes;

  const ButtonType = translucentHeader ? LandingMainSectionActionButton : HeaderActionButton;
  const headerActions = signedIn ? (
    <>
      <ButtonType onClick={signOut.navigator}>Sign out</ButtonType>
      <ButtonType isPrimary onClick={tripList.navigator}>
        Trips
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
    <UseHeaderWrapper translucent={translucentHeader} className={className}>
      <Logo logoType={logoType} onClick={home.navigator} />
      <HeaderActions>{headerActions}</HeaderActions>

      <HeaderActions forMobile>
        <MobileMenuHamburgerIcon
          darkIcon={!(isLanding && translucentHeader)}
          onClick={() => setMobileMenuOpen(true)}
        >
          <IoIosMenu />
        </MobileMenuHamburgerIcon>
        <MobileMenu
          onDismiss={() => setMobileMenuOpen(false)}
          visible={mobileMenuOpen}
        ></MobileMenu>
      </HeaderActions>
    </UseHeaderWrapper>
  );
}

export default Header;
