import React, { ReactChild } from 'react';
import styled, { css } from 'styled-components';

const DefaultButton = styled.button<{ isPrimary: boolean }>`
  ${({ theme: { palette }, isPrimary }) => css`
    background: ${isPrimary ? palette.purple : palette.cloudLighter};
    border-radius: 0.2rem;
    border: 0.05rem solid ${isPrimary ? palette.purple : palette.cloud};
    box-shadow: 0 0 0 transparent;
    color: ${isPrimary ? 'white' : palette.regular};
    cursor: pointer;
    font-size: 1em;
    font-weight: 400;
    padding: 0.7rem 1rem;
    text-shadow: 0 0 0 transparent;
    transition: border 0.1s, box-shadow 0.1s, transform 0.1s, text-shadow 0.1s;

    &:hover {
      background: ${isPrimary ? palette.purpleLighter : palette.cloudLighter};
      border: 0.05rem solid ${isPrimary ? palette.purpleLighter : palette.cloud};
      box-shadow: 0 0 0.3rem ${isPrimary ? palette.purpleLighter : palette.cloud};
      text-shadow: 0 0 0 transparent;
    }

    &:active {
      background: ${isPrimary ? palette.purple : palette.cloudLighter};
      border: 0.05rem solid ${isPrimary ? palette.purple : palette.cloud};
      box-shadow: 0 0.02rem 0.15rem ${isPrimary ? palette.purple : palette.cloud};
      outline: none;
      transform: translateY(0.05rem);
    }

    &:focus {
      outline: 0;
    }
  `}
`;

type Props = {
  children: ReactChild;
  isPrimary?: boolean;
  onClick?: () => void;
};

function Button({ children, isPrimary = false, onClick }: Props) {
  return (
    <DefaultButton onClick={onClick} isPrimary={isPrimary}>
      {children}
    </DefaultButton>
  );
}

export default Button;
