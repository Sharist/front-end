import React, { ReactChild } from 'react';
import styled, { css } from 'styled-components';

import Spinner from './Spinner';

const BaseButton = styled.button`
  ${({ disabled, theme: { palette } }) =>
    css`
      align-items: center;
      background-color: ${palette.ASH};
      border-radius: 0.2rem;
      border: 0.05rem solid ${palette.ASH};
      box-shadow: 0 0 0 transparent;
      color: ${disabled ? palette.GREY : palette.REGULAR};
      cursor: ${disabled ? 'default' : 'pointer'};
      display: flex;
      font-weight: 400;
      justify-content: center;
      padding: 0.4rem 1rem;
      text-shadow: 0 0 0 transparent;
      transition: border 0.1s, box-shadow 0.1s, text-shadow 0.1s;

      &:hover {
        border: ${disabled ? '' : `0.05rem solid ${palette.ASH}`};
        box-shadow: ${disabled
          ? `0 0 0 ${palette.TRANSPARENT}`
          : `0 0 0.3rem ${palette.ASH_DARKER}`};
        text-shadow: 0 0 0 transparent;
      }

      &:active {
        border: ${disabled ? '' : `0.05rem solid ${palette.ASH}`};
        box-shadow: ${disabled ? '' : `0 0.02rem 0.15rem ${palette.ASH_DARKER}`};
        outline: none;
        transform: ${disabled ? 'none' : 'translateY(0.05rem)'};
      }

      &:focus {
        outline: 0;
      }
    `}
`;

const PrimaryButton = styled(BaseButton)`
  ${({ disabled, theme: { palette } }) => css`
    background-color: ${disabled ? palette.SUN_LIGHTER : palette.SUN};
    border-color: ${disabled ? palette.SUN_LIGHTER : palette.SUN};
    color: ${disabled ? palette.ASH_LIGHTER : palette.WHITE};
    text-shadow: 0 0 0.01rem ${palette.GREY_DARKER};

    &:hover {
      border-color: ${palette.SUN_LIGHTER};
      box-shadow: ${disabled
        ? `0 0 0 ${palette.TRANSPARENT}`
        : `0 0 0.3rem ${palette.SUN_LIGHTER}`};
    }

    &:active {
      border-color: ${disabled ? palette.SUN_LIGHTER : palette.SUN};
      box-shadow: ${disabled ? `0 0 0 ${palette.TRANSPARENT}` : `0 0.02rem 0.15rem ${palette.SUN}`};
    }
  `}
`;

const TransparentButton = styled(BaseButton)`
  ${({ disabled, theme: { palette } }) => css`
    background-color: ${palette.TRANSPARENT};
    border: none;
    box-shadow: 0 0 0 ${palette.TRANSPARENT};
    color: ${disabled ? palette.ASH_DARKER : palette.GREY_DARKER};
    padding: 0;

    &:hover,
    &:focus {
      border: none;
      box-shadow: 0 0 0 ${palette.TRANSPARENT};
      text-shadow: 0 0 0.1rem ${disabled ? palette.TRANSPARENT : palette.ASH_DARKER};
    }
  `}
`;

const ButtonContent = styled.span<{ isHidden: boolean }>`
  ${({ isHidden }) => css`
    opacity: ${isHidden ? 0 : 1};
  `}
`;

const SpinnerContainer = styled.span`
  position: absolute;
`;

type Props = {
  children: ReactChild | ReactChild[];
  className?: string;
  disabled?: boolean;
  /** Button will be disabled and a spinner will show up replacing the text. Overrides `disabled` setting. */
  isLoading?: boolean;
  /** Set background to primary color. If `transparent` is set, this prop is ignored. */
  isPrimary?: boolean;
  onClick?: () => void;
  /** Set background to transparent. Overrides `isPrimary`. */
  transparent?: boolean;
};

function Button({
  children,
  className,
  disabled = false,
  isLoading = false,
  isPrimary = false,
  onClick,
  transparent = false,
}: Props) {
  const shouldDisableButton = disabled || isLoading;

  let ButtonComponent = BaseButton;
  if (transparent) {
    ButtonComponent = TransparentButton;
  } else if (isPrimary) {
    ButtonComponent = PrimaryButton;
  }

  function onClickWrapper() {
    if (shouldDisableButton) {
      return;
    }

    onClick?.();
  }

  return (
    <ButtonComponent disabled={shouldDisableButton} className={className} onClick={onClickWrapper}>
      <ButtonContent isHidden={isLoading}>{children}</ButtonContent>
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </ButtonComponent>
  );
}

export default Button;
