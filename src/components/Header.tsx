import React from 'react';
import { navigate, useLocation } from '@reach/router';
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

const HeaderTitle = styled.span.attrs({ className: 'noselect' })`
  ${({ theme: { palette, spacing, typography } }) => css`
    border-radius: 0.2rem;
    cursor: pointer;
    font-size: ${typography.X_LARGE};
    font-weight: ${typography.LIGHT};
    padding: ${spacing.SMALL};
    text-shadow: 0 0 0.15rem ${palette.CLOUD_DARKER};
    transition: background-color 0.1s, color 0.1s, text-shadow 0.1s;
  `}
`;

const HeaderActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  width: 12.5rem;
`;

function Header() {
  const location = useLocation();

  return (
    <HeaderWrapper>
      <HeaderTitle onClick={() => location.pathname !== '/' && navigate('/')}>SHARIST</HeaderTitle>
      <HeaderActions>
        <Button isPrimary>Sign up</Button>
        <Button>Log in</Button>
      </HeaderActions>
    </HeaderWrapper>
  );
}

export default Header;
