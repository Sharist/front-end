import React from 'react';
import styled, { css } from 'styled-components';

import Button from './Button';
import { navigate, useLocation } from '@reach/router';

const HeaderWrapper = styled.nav`
  ${({ theme: { breakpoints, spacing } }) => css`
    display: flex;
    justify-content: space-between;
    margin: auto;
    padding: ${spacing.medium} ${spacing.xlarge};
    transition: padding 1s;
    width: 100%;

    @media screen and (max-width: ${breakpoints.mobile}) {
      padding: ${spacing.medium};
    }
  `}
`;

const HeaderTitle = styled.span.attrs({ className: 'noselect' })`
  ${({ theme: { palette, spacing, typography } }) => css`
    border-radius: 0.2rem;
    border: 0.05rem solid ${palette.grey};
    font-size: ${typography.xlarge};
    font-weight: ${typography.light};
    margin: -calc(${spacing.small} * 2 + ${spacing.medium} * 2}) 0;
    padding: ${spacing.small};
    text-shadow: 0 0 0.15rem ${palette.cloudDarker};
    transition: background-color 0.1s, color 0.1s, text-shadow 0.1s;

    :hover {
      background-color: ${palette.regular};
      color: ${palette.cloud};
      cursor: pointer;
      text-shadow: 0 0 0.15rem ${palette.cloud};
    }
  `}
`;

const HeaderActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 11rem;
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
