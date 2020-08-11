import React, { ReactChild } from 'react';
import styled from 'styled-components';

const DefaultButton = styled.button < { isPrimary: boolean }> `
  ${({ theme: { palette }, isPrimary }) => `
    background: ${isPrimary ? palette.purple : 'transparent'};
    border-radius: 0.2rem;
    border: 0.05rem solid ${isPrimary ? palette.purple : palette.cloud};
    box-shadow: 0 0 0 transparent;
    color: ${isPrimary ? 'white' : palette.regular};
    cursor: pointer;
    font-weight: 500;
    padding: 0.5rem 0.8rem;
    text-shadow: 0 0 0 transparent;
    transition: border 0.1s, box-shadow 0.1s, transform 0.1s, text-shadow 0.1s;

    &:hover {
      background: ${isPrimary ? palette.purpleLighter : 'transparent'};
      border: 0.05rem solid ${isPrimary ? palette.purpleLighter : palette.cloud};
      box-shadow: 0 0 0.3rem ${isPrimary ? palette.purpleLighter : palette.cloud};
      text-shadow: 0 0 0 transparent;
    }

    &:active {
      background: ${isPrimary ? palette.purple : 'transparent'};
      border: 0.05rem solid ${isPrimary ? palette.purple : palette.cloud};
      box-shadow: 0 0.02rem 0.15rem ${isPrimary ? palette.purple : palette.cloud};
      outline: none;
      transform: translateY(0.05rem);
    }

    &:focus {
      outline: 0;
    }
  `}`;

type Props = {
  children: ReactChild;
  isPrimary?: boolean;
};


function Button({ children, isPrimary = false }: Props) {
  return (
    <DefaultButton isPrimary={isPrimary}>{children}</DefaultButton>
  );
}


export default Button;