import React, { ReactChild } from 'react';
import styled, { css } from 'styled-components';

const BaseButton = styled.button`
  ${({ theme: { palette } }) =>
    css`
      background-color: ${palette.CLOUD_LIGHTER};
      border-radius: 0.2rem;
      border: 0.05rem solid ${palette.CLOUD};
      box-shadow: 0 0 0 transparent;
      color: palette.REGULAR;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: 400;
      padding: 0.6rem 1rem;
      text-shadow: 0 0 0 transparent;
      transition: border 0.1s, box-shadow 0.1s, text-shadow 0.1s;

      &:hover {
        background: ${palette.CLOUD_LIGHTER};
        border: 0.05rem solid ${palette.CLOUD};
        box-shadow: 0 0 0.3rem ${palette.CLOUD};
        text-shadow: 0 0 0 transparent;
      }

      &:active {
        background: ${palette.CLOUD_LIGHTER};
        border: 0.05rem solid ${palette.CLOUD};
        box-shadow: 0 0.02rem 0.15rem ${palette.CLOUD};
        outline: none;
        transform: translateY(0.05rem);
      }

      &:focus {
        outline: 0;
      }
    `}
`;

const PrimaryButton = styled(BaseButton)`
  ${({ theme: { palette } }) => css`
    background-color: ${palette.PURPLE};
    border-color: ${palette.PURPLE};
    color: ${palette.WHITE};

    &:hover {
      background-color: ${palette.PURPLE_LIGHTER};
      border-color: ${palette.PURPLE_LIGHTER};
      box-shadow: 0 0 0.3rem ${palette.PURPLE_LIGHTER};
    }

    &:active {
      background-color: ${palette.PURPLE};
      border-color: ${palette.PURPLE};
      box-shadow: 0 0.02rem 0.15rem ${palette.PURPLE};
    }
  `}
`;

const TransparentButton = styled(BaseButton)`
  ${({ theme: { palette } }) => css`
    background-color: ${palette.TRANSPARENT};
    border-color: ${palette.TRANSPARENT};
    color: ${palette.GREY_DARKER};
    padding: 0;
    border-radius: 0;

    &:hover,
    &:focus {
      background-color: ${palette.TRANSPARENT};
      border-color: ${palette.TRANSPARENT};
      box-shadow: 0 0 0 ${palette.TRANSPARENT};
      text-shadow: 0 0 0.1rem ${palette.CLOUD_DARKER};
    }

    &:active {
      background-color: ${palette.TRANSPARENT};
      border-color: ${palette.TRANSPARENT};
      box-shadow: 0 0 0 ${palette.TRANSPARENT};
      text-shadow: 0 0 0.1rem ${palette.CLOUD_DARKER};
      transform: translateY(0.05rem);
    }
  `}
`;

type Props = {
  children: ReactChild | ReactChild[];
  className?: string;
  /** Set background to primary color. If `transparent` is set, this prop is ignored. */
  isPrimary?: boolean;
  onClick?: () => void;
  /** Set background to transparent. Overrides `isPrimary`. */
  transparent?: boolean;
};

function Button({ children, className, isPrimary = false, onClick, transparent = false }: Props) {
  let ButtonComponent = BaseButton;
  if (transparent) {
    ButtonComponent = TransparentButton;
  } else if (isPrimary) {
    ButtonComponent = PrimaryButton;
  }

  return (
    <ButtonComponent className={className} onClick={onClick}>
      {children}
    </ButtonComponent>
  );
}

export default Button;
