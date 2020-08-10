import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const DefaultHeader = styled.nav`
  border-bottom: 0.05rem solid #ddd;
  box-shadow: 0 0 0.25rem #ddd;
  
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  padding: 1rem 1.5rem;
  width: 100%;
`;

const HeaderTitle = styled.span.attrs({ className: 'noselect' })`
  border-radius: 0.2rem;
  border: 1px solid #888;

  font-family: 'Roboto';
  font-size: 1.5rem;
  font-weight: 300;
  text-shadow: 0 0 0.15rem #aaa;
  
  margin: -0.3rem 0;
  padding: 0.5rem;

  transition: background-color 0.1s, color 0.1s, text-shadow 0.1s;

  :hover {
    background-color: #222;

    color: #ddd;
    text-shadow: 0 0 0.15rem #ddd;

    cursor: pointer;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 9.5rem;
`;

function Header() {
  return <DefaultHeader>
    <HeaderTitle>SHARIST</HeaderTitle>
    <HeaderActions>
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </HeaderActions >
  </DefaultHeader >;
}

export default Header;