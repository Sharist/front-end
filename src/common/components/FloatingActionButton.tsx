import React, { useRef } from 'react';
import { IconType } from 'react-icons';
import styled, { css } from 'styled-components';

import Button from './Button';
import Tooltip from './Tooltip';

const Wrapper = styled.div<{ isContextual: boolean }>`
  ${({ isContextual, theme: { breakpoints } }) => css`
    align-items: center;
    display: flex;

    ${!isContextual && 'position: fixed; bottom: 3rem; right: 3rem;'};

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      ${!isContextual &&
      css`
        position: fixed;
        bottom: 1rem;
        right: 1rem;
      `};
    }
  `}
`;

const BaseFab = styled(Button)<{ disabled: boolean }>`
  ${({ disabled, theme: { palette } }) => css`
    align-items: center;
    border-radius: 50%;
    display: flex;
    height: 4rem;
    justify-content: center;
    width: 4rem;
    transition: box-shadow 150ms, transform 150ms;
    ${!disabled &&
    css`
      box-shadow: 0 0 0.35rem ${palette.grey.css};
    `}

    &:hover,
    &:focus {
      ${disabled
        ? css`
            box-shadow: 0 0 0 ${palette.transparent.css};
          `
        : css`
            box-shadow: 0 0.05rem 0.25rem ${palette.grey.css};
            transform: translateY(-0.05rem) scale(1.025);
          `}
    }

    &:active {
      ${disabled
        ? css`
            box-shadow: 0 0 0 ${palette.transparent.css};
          `
        : css`
            box-shadow: 0 0 0.35rem ${palette.grey.css};
            transform: translateY(0) scale(1);
          `}
    }
  `}
`;

type Props = {
  disabled?: boolean;
  icon: IconType;
  isContextual?: boolean;
  isPrimary?: boolean;
  label?: string;
  onClick?: () => void;
};

function FloatingActionButton({
  disabled = false,
  icon,
  isContextual = false,
  isPrimary = false,
  label,
  onClick,
}: Props) {
  const Icon = icon;
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <Wrapper isContextual={isContextual}>
      {label && <Tooltip anchor={buttonRef} text={label} />}
      <BaseFab disabled={disabled} buttonRef={buttonRef} isPrimary={isPrimary} onClick={onClick}>
        <Icon size='2.25rem' />
      </BaseFab>
    </Wrapper>
  );
}

export default FloatingActionButton;
