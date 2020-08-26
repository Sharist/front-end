import React, { useState } from 'react';
import { IoMdClose, IoIosMenu } from 'react-icons/io';
import { navigate, useLocation, Link } from '@reach/router';
import styled, { css } from 'styled-components';

import { Breakpoint } from '../common/themes';
import Button from './Button';
import HideAbove from './helpers/HideAbove';
import HideBelow from './helpers/HideBelow';

export const HEADER_HEIGHT_REM = 5;

const HeaderWrapper = styled.div`
  ${({ theme: { breakpoints } }) => css`
    align-items: center;
    display: flex;
    height: ${HEADER_HEIGHT_REM}rem;
    justify-content: space-between;
    margin: auto;
    padding: 0.5rem 1rem;
    transition: padding 1s;
    width: 100%;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      padding: 0.5rem;
    }
  `}
`;

const HeaderTitle = styled.div`
  ${({ theme: { breakpoints } }) => css`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 20rem;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      width: unset;
    }
  `}
`;

const SiteMapLink = styled(Link)`
  ${({ theme: { palette, typography } }) => css`
    border-bottom: 0.05rem solid transparent;
    color: ${palette.GREY_DARKER};
    font-size: ${typography.MEDIUM};
    margin: 0.5rem;
    text-decoration: none;
    transition: border-bottom 200ms, color 200ms;

    &:hover {
      border-bottom: 0.05rem solid ${palette.GREY_DARKER};
      color: ${palette.BLACK};
    }

    &:visited {
      color: !unset;
    }
  `}
`;

const Logo = styled.span.attrs({ className: 'noselect' })`
  ${({ theme: { breakpoints, palette, typography } }) => css`
    border-radius: 0.2rem;
    cursor: pointer;
    font-size: ${typography.X_LARGE};
    font-weight: 300;
    padding: 0.5rem;
    text-shadow: 0 0 0.15rem ${palette.CLOUD_DARKER};
    transition: background-color 0.1s, color 0.1s, text-shadow 0.1s;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      padding: 0.25rem;
    }
  `}
`;

const HeaderActions = styled.div`
  ${({ theme: { breakpoints } }) => css`
    align-items: center;
    display: flex;
    justify-content: space-around;
    width: 12.5rem;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: 2rem;
      padding: '0.5rem';
      width: unset;
    }
  `}
`;

const MobileMenuShadow = styled.div<{ visible: boolean }>`
  ${({ visible, theme: { palette } }) => css`
    background-color: ${palette.GREY_DARKER};
    bottom: 0;
    left: 0;
    opacity: ${visible ? 0.3 : 0};
    position: fixed;
    right: 0;
    top: 0;
    transition: opacity 500ms;
    z-index: ${visible ? 999 : -1000};
  `}
`;

const MobileMenu = styled.div<{ visible: boolean }>`
  ${({ visible, theme: { palette } }) => css`
    background-color: white;
    bottom: 0;
    box-shadow: 0 0 2rem ${visible ? palette.GREY_DARKER : 'transparent'};
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    left: 20%;
    position: fixed;
    right: 0;
    top: 0;
    transform: ${visible ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 500ms, box-shadow ease-out 500ms;
    z-index: 1000;
  `}
`;

function Header() {
  const location = useLocation();

  function handleLogoClick() {
    location.pathname !== '/' && navigate('/');
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleMobileShadowClick() {
    setMobileMenuOpen(false);
  }

  return (
    <>
      <HideAbove breakpoint={Breakpoint.MOBILE}>
        <MobileMenuShadow
          onClick={handleMobileShadowClick}
          visible={mobileMenuOpen}
        ></MobileMenuShadow>
      </HideAbove>

      <HeaderWrapper>
        <HeaderTitle>
          <Logo onClick={handleLogoClick}>SHARIST</Logo>
          <HideBelow breakpoint={Breakpoint.MOBILE}>
            <SiteMapLink to=''>About</SiteMapLink>
            <SiteMapLink to=''>Product</SiteMapLink>
          </HideBelow>
        </HeaderTitle>

        <HeaderActions>
          <HideBelow breakpoint={Breakpoint.MOBILE}>
            <Button isPrimary>Sign up</Button>
            <Button>Log in</Button>
          </HideBelow>

          <HideAbove breakpoint={Breakpoint.MOBILE}>
            <IoIosMenu onClick={() => setMobileMenuOpen(true)} />
            <MobileMenu visible={mobileMenuOpen}>
              <IoMdClose onClick={() => setMobileMenuOpen(false)}></IoMdClose>
            </MobileMenu>
          </HideAbove>
        </HeaderActions>
      </HeaderWrapper>
    </>
  );
}

export default Header;
