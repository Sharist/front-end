import React, { ReactChild } from 'react';
import styled, { css } from 'styled-components';

const DefaultButton = styled.button<{ isPrimary: boolean }>`
  ${({ theme: { palette }, isPrimary }) => css`
    background: ${isPrimary ? palette.PURPLE : palette.CLOUD_LIGHTER};
    border-radius: 0.2rem;
    border: 0.05rem solid ${isPrimary ? palette.PURPLE : palette.CLOUD};
    box-shadow: 0 0 0 transparent;
    color: ${isPrimary ? 'white' : palette.REGULAR};
    cursor: pointer;
    font-weight: 400;
    padding: 0.6rem 1rem;
    text-shadow: 0 0 0 transparent;
    transition: border 0.1s, box-shadow 0.1s, transform 0.1s, text-shadow 0.1s;

    &:hover {
      background: ${isPrimary ? palette.PURPLE_LIGHTER : palette.CLOUD_LIGHTER};
      border: 0.05rem solid ${isPrimary ? palette.PURPLE_LIGHTER : palette.CLOUD};
      box-shadow: 0 0 0.3rem ${isPrimary ? palette.PURPLE_LIGHTER : palette.CLOUD};
      text-shadow: 0 0 0 transparent;
    }

    &:active {
      background: ${isPrimary ? palette.PURPLE : palette.CLOUD_LIGHTER};
      border: 0.05rem solid ${isPrimary ? palette.PURPLE : palette.CLOUD};
      box-shadow: 0 0.02rem 0.15rem ${isPrimary ? palette.PURPLE : palette.CLOUD};
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
  className?: string;
  isPrimary?: boolean;
  onClick?: () => void;
};

function Button({ children, className, isPrimary = false, onClick }: Props) {
  return (
    <DefaultButton className={className} onClick={onClick} isPrimary={isPrimary}>
      {children}
    </DefaultButton>
  );
}

export default Button;
