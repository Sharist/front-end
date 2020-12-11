import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import Spinner from './Spinner';

export const ButtonRow = styled.div`
  display: flex;

  & > * {
    margin: 0 0.5rem;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

const BaseButton = styled.button`
  ${({ disabled, theme: { palette } }) =>
    css`
      background-color: ${palette.ash.css};
      border: 0.05rem solid ${palette.ash.css};

      align-items: center;
      border-radius: 0.2rem;
      color: ${palette.regular.css};
      cursor: pointer;
      display: flex;
      font-weight: 400;
      justify-content: center;
      padding: 0.4rem 1rem;
      text-shadow: 0 0 0 transparent;

      ${!disabled &&
      css`
        box-shadow: 0 0.05rem 0.1rem ${palette.ash.darker.css};
        transition: background-color 150ms, border 150ms, box-shadow 150ms, text-shadow 150ms;

        &:hover,
        &:focus {
          box-shadow: 0 0.15rem 0.5rem ${palette.ash.darker.css};
          text-shadow: 0 0 0 transparent;
          outline: 0;
        }

        &:active {
          background-color: ${palette.ash.lighter.css};
          border-color: ${palette.ash.lighter.css};
          box-shadow: 0 0.25rem 0.65rem ${palette.ash.darker.css};
          outline: none;
        }
      `}

      ${disabled &&
      css`
        color: ${palette.grey.css};
        cursor: default;
      `}
    `}
`;

const PrimaryButton = styled(BaseButton)`
  ${({ disabled, theme: { palette } }) => {
    return css`
      background-color: ${palette.sun.css};
      border-color: ${palette.sun.css};

      color: ${palette.white.css};
      text-shadow: 0 0 0.01rem ${palette.grey.darker.css};

      ${!disabled &&
      css`
        &:active {
          background-color: ${palette.sun.lighter.css};
          border-color: ${palette.sun.lighter.css};
        }
      `}

      ${disabled &&
      css`
        background-color: ${palette.sun.lighter.css};
        border-color: ${palette.sun.lighter.css};
        color: ${palette.ash.lighter.css};
      `}
    `;
  }}
`;

const TransparentButton = styled(BaseButton)`
  ${({ disabled, theme: { palette } }) => css`
    background-color: ${palette.transparent.css};
    border-color: ${palette.transparent.css};
    box-shadow: 0 0 0 ${palette.transparent.css};
    color: ${palette.asphalt.css};
    padding: 0.25rem;

    ${!disabled &&
    css`
      &:hover,
      &:focus {
        box-shadow: 0 0 0 ${palette.transparent.css};
        background-color: ${palette.transparent.css};
        color: ${palette.black.darker.css};
        text-shadow: 0 0 0.02rem ${palette.grey.darker.css};
      }

      &:active {
        border-color: ${palette.transparent.css};
        color: ${palette.grey.lighter.css};
        text-shadow: 0 0 0.02rem ${palette.grey.lighter.css};
      }
    `}

    ${disabled &&
    css`
      color: ${palette.ash.darker.css};
    `}
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
  children: ReactNode;
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
