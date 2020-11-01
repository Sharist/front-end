import React, { ReactChild } from 'react';
import styled, { css } from 'styled-components';

import Spinner from './Spinner';

const BaseButton = styled.button`
  ${({ disabled, theme: { palette } }) =>
    css`
      align-items: center;
      background-color: ${palette.ash.css};
      border-radius: 0.2rem;
      border: 0.05rem solid ${palette.ash.css};
      box-shadow: 0 0 0 transparent;
      color: ${disabled ? palette.grey.css : palette.regular.css};
      cursor: ${disabled ? 'default' : 'pointer'};
      display: flex;
      font-weight: 400;
      justify-content: center;
      padding: 0.4rem 1rem;
      text-shadow: 0 0 0 transparent;
      transition: border 0.1s, box-shadow 0.1s, text-shadow 0.1s;

      &:hover {
        border: ${disabled ? '' : `0.05rem solid ${palette.ash.css}`};
        box-shadow: ${disabled
          ? `0 0 0 ${palette.transparent.css}`
          : `0 0 0.3rem ${palette.ash.darker.css}`};
        text-shadow: 0 0 0 transparent;
      }

      &:active {
        border: ${disabled ? '' : `0.05rem solid ${palette.ash.css}`};
        box-shadow: ${disabled ? '' : `0 0.02rem 0.15rem ${palette.ash.darker.css}`};
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
    background-color: ${disabled ? palette.sun.lighter.css : palette.sun.css};
    border-color: ${disabled ? palette.sun.lighter.css : palette.sun.css};
    color: ${disabled ? palette.ash.lighter.css : palette.white.css};
    text-shadow: 0 0 0.01rem ${palette.grey.darker.css};

    &:hover {
      border-color: ${palette.sun.lighter.css};
      box-shadow: ${disabled
        ? `0 0 0 ${palette.transparent.css}`
        : `0 0 0.3rem ${palette.sun.lighter.css}`};
    }

    &:active {
      border-color: ${disabled ? palette.sun.lighter.css : palette.sun.css};
      box-shadow: ${disabled
        ? `0 0 0 ${palette.transparent.css}`
        : `0 0.02rem 0.15rem ${palette.sun}`};
    }
  `}
`;

const TransparentButton = styled(BaseButton)`
  ${({ disabled, theme: { palette } }) => css`
    background-color: ${palette.transparent.css};
    border: none;
    box-shadow: 0 0 0 ${palette.transparent.css};
    color: ${disabled ? palette.ash.darker.css : palette.grey.darker.darker.css};
    padding: 0;

    &:hover,
    &:focus {
      border: none;
      box-shadow: 0 0 0 ${palette.transparent.css};
      text-shadow: 0 0 0.1rem ${disabled ? palette.transparent.css : palette.ash.darker.css};
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
