import React from 'react';
import { navigate, useLocation, Link } from '@reach/router';
import styled, { css } from 'styled-components';

import Button from './Button';

export const HEADER_HEIGHT = 5;

const HeaderWrapper = styled.div`
  ${({ theme: { breakpoints, spacing } }) => css`
    align-items: center;
    display: flex;
    height: ${HEADER_HEIGHT}rem;
    justify-content: space-between;
    margin: auto;
    padding: ${spacing.SMALL} ${spacing.MEDIUM};
    transition: padding 1s;
    width: 100%;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      padding: ${spacing.SMALL};
    }
  `}
`;

const HeaderTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 21rem;
  `}
`;

const SiteMapLink = styled(Link)`
  ${({ theme: { palette, typography } }) => css`
    color: ${palette.BLACK};
    font-size: ${typography.MEDIUM};
    margin: 0.5rem;
    text-decoration: none;

    &:visited {
      color: ${palette.BLACK};
    }
  `}
`;

const Logo = styled.span.attrs({ className: 'noselect' })`
  ${({ theme: { breakpoints, palette, spacing, typography } }) => css`
    border-radius: 0.2rem;
    border: 0.05rem solid black;
    cursor: pointer;
    font-size: ${typography.X_LARGE};
    font-weight: ${typography.LIGHT};
    padding: 0.5rem;
    text-shadow: 0 0 0.15rem ${palette.CLOUD_DARKER};
    transition: background-color 0.1s, color 0.1s, text-shadow 0.1s;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      padding: ${spacing.X_SMALL};
    }
  `}
`;

const HeaderActions = styled.div`
  ${({ theme: { breakpoints, typography } }) => css`
    align-items: center;
    display: flex;
    justify-content: space-around;
    width: 12.5rem;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: ${typography.REGULAR};
      width: 11rem;
    }
  `}
`;

function Header() {
  const location = useLocation();

  function handleLogoClick() {
    location.pathname !== '/' && navigate('/');
  }

  return (
    <HeaderWrapper>
      <HeaderTitle>
        <Logo onClick={handleLogoClick}>SHARIST</Logo>
        <div>
          <SiteMapLink to=''>About</SiteMapLink>
          <SiteMapLink to=''>Product</SiteMapLink>
        </div>
      </HeaderTitle>
      <HeaderActions>
        <Button isPrimary>Sign up</Button>
        <Button>Log in</Button>
      </HeaderActions>
    </HeaderWrapper>
  );
}

export default Header;
