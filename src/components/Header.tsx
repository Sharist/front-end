import React from 'react';
import styled from 'styled-components';

import breakpoints from '../common/breakpoints';
import Button from './Button';

const HeaderWrapper = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 1200px;
  padding: 1rem 2rem;
  transition: padding 1s;
  width: 100%;

  @media screen and (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;


const HeaderTitle = styled.span.attrs({ className: 'noselect' })`
  ${({ theme: { palette, spacing, typography } }) => `
    border-radius: 0.2rem;
    border: 0.05rem solid ${palette.grey};

    font-size: ${typography.large};
    font-weight: ${typography.light};
    text-shadow: 0 0 0.15rem ${palette.cloudDarker};
    margin: -0.3rem 0;
    padding: ${spacing.small};
    transition: background-color 0.1s, color 0.1s, text-shadow 0.1s;

    :hover {
      background-color: ${palette.regular};
      color: ${palette.cloud};
      text-shadow: 0 0 0.15rem ${palette.cloud};
      cursor: pointer;
    }
  `}`;

const HeaderActions = styled.div`
	display: flex;
	justify-content: space-between;
	width: 9.5rem;
`;

function Header() {
  return <HeaderWrapper>
    <HeaderTitle>SHARIST</HeaderTitle>
    <HeaderActions>
      <Button isPrimary>Sign up</Button>
      <Button>Log in</Button>
    </HeaderActions >
  </HeaderWrapper >;
}

export default Header;