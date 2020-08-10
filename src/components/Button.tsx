import React, { ReactChild } from 'react';
import styled from 'styled-components';

const DefaultButton = styled.button`
  /** Reset button */
  background: transparent;
  border: 0.05rem solid #ddd;
  border-radius: 0.2rem;
  box-shadow: 0px 0px 0px transparent;
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  text-shadow: 0px 0px 0px transparent;
  transition: border 0.1s, box-shadow 0.1s, transform 0.1s, text-shadow 0.1s;

  &:hover {
    background: transparent;
    border: 0.05rem solid #ddd;
    box-shadow: 0 0 0.5rem #ddd;
    text-shadow: 0px 0px 0px transparent;
  }

  &:active {
    border: 0.05rem solid #ccc;
    box-shadow: 0 0.02rem 0.15rem #ccc;
    outline: none;
    transform: translateY(0.05rem);
  }

  &:focus {
    outline: 0;
  }
`;

type Props = {
  children: ReactChild;
};

function Button({ children }: Props) {
  return (
    <DefaultButton>{children}</DefaultButton>
  );
}

export default Button;