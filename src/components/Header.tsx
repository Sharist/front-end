import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const DefaultHeader = styled.nav`
  ${({ theme: { palette, spacing } }) => `
    align-items: center;
    border-bottom: 0.05rem solid ${palette.cloud};
    box-shadow: 0 0 ${spacing.xsmall} ${palette.cloud};
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    width: 100%;
  `}`;


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
  return <DefaultHeader>
    <HeaderTitle>SHARIST</HeaderTitle>
    <HeaderActions>
      <Button isPrimary>Sign up</Button>
      <Button>Log in</Button>
    </HeaderActions >
  </DefaultHeader >;
}

export default Header;