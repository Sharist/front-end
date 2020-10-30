import React, { ReactChild } from 'react';
import styled, { css } from 'styled-components';

import Spinner from './Spinner';

const BaseButton = styled.button`
  ${({ disabled, theme: { palette } }) =>
    css`
      align-items: center;
      background-color: ${palette.ash.rgba};
      border-radius: 0.2rem;
      border: 0.05rem solid ${palette.ash.rgba};
      box-shadow: 0 0 0 transparent;
      color: ${disabled ? palette.grey.rgba : palette.regular.rgba};
      cursor: ${disabled ? 'default' : 'pointer'};
      display: flex;
      font-weight: 400;
      justify-content: center;
      padding: 0.4rem 1rem;
      text-shadow: 0 0 0 transparent;
      transition: border 0.1s, box-shadow 0.1s, text-shadow 0.1s;

      &:hover {
        border: ${disabled ? '' : `0.05rem solid ${palette.ash.rgba}`};
        box-shadow: ${disabled
          ? `0 0 0 ${palette.transparent.rgba}`
          : `0 0 0.3rem ${palette.ash.darker.rgba}`};
        text-shadow: 0 0 0 transparent;
      }

      &:active {
        border: ${disabled ? '' : `0.05rem solid ${palette.ash.rgba}`};
        box-shadow: ${disabled ? '' : `0 0.02rem 0.15rem ${palette.ash.darker.rgba}`};
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
    background-color: ${disabled ? palette.sun.lighter.rgba : palette.sun.rgba};
    border-color: ${disabled ? palette.sun.lighter.rgba : palette.sun.rgba};
    color: ${disabled ? palette.ash.lighter.rgba : palette.white.rgba};
    text-shadow: 0 0 0.01rem ${palette.grey.darker.rgba};

    &:hover {
      border-color: ${palette.sun.lighter.rgba};
      box-shadow: ${disabled
        ? `0 0 0 ${palette.transparent.rgba}`
        : `0 0 0.3rem ${palette.sun.lighter.rgba}`};
    }

    &:active {
      border-color: ${disabled ? palette.sun.lighter.rgba : palette.sun.rgba};
      box-shadow: ${disabled
        ? `0 0 0 ${palette.transparent.rgba}`
        : `0 0.02rem 0.15rem ${palette.sun}`};
    }
  `}
`;

const TransparentButton = styled(BaseButton)`
  ${({ disabled, theme: { palette } }) => css`
    background-color: ${palette.transparent.rgba};
    border: none;
    box-shadow: 0 0 0 ${palette.transparent.rgba};
    color: ${disabled ? palette.ash.darker.rgba : palette.grey.darker.darker.rgba};
    padding: 0;

    &:hover,
    &:focus {
      border: none;
      box-shadow: 0 0 0 ${palette.transparent.rgba};
      text-shadow: 0 0 0.1rem ${disabled ? palette.transparent.rgba : palette.ash.darker.rgba};
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
  buttonRef?: React.Ref<HTMLButtonElement>;
  children: ReactChild | ReactChild[];
  className?: string;
  disabled?: boolean;
  /** Button will be disabled and a spinner will show up replacing the text. Overrides `disabled` setting. */
  isLoading?: boolean;
  /** Set background to primary color. If `transparent` is set, this prop is ignored. */
  isPrimary?: boolean;
  name?: string;
  onClick?: () => void;
  /** Set background to transparent. Overrides `isPrimary`. */
  transparent?: boolean;
  type?: 'button' | 'reset' | 'submit';
};

function Button({
  buttonRef,
  children,
  className,
  disabled = false,
  isLoading = false,
  isPrimary = false,
  name,
  onClick,
  transparent = false,
  type = 'button',
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
    <ButtonComponent
      disabled={shouldDisableButton}
      className={className}
      name={name}
      onClick={onClickWrapper}
      ref={buttonRef}
      type={type}
    >
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
