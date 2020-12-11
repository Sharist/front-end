import React, { useRef } from 'react';
import { IconType } from 'react-icons';
import { mixins } from '../styles/Theme';
import styled, { css } from 'styled-components';

import Button from './Button';
import Tooltip from './Tooltip';

const Wrapper = styled.div<{ isContextual: boolean }>`
  ${({ isContextual }) => css`
    align-items: center;
    display: flex;

    ${!isContextual && 'position: fixed; bottom: 3rem; right: 3rem;'};

    ${mixins.belowMobile} {
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

    ${!disabled &&
    css`
      box-shadow: 0 0.15rem 0.35rem ${palette.ash.darker.css};

      &:hover,
      &:focus {
        box-shadow: 0 0.2rem 0.55rem ${palette.ash.darker.css};
      }

      &:active {
        box-shadow: 0 0.4rem 0.85rem ${palette.ash.darker.css};
      }
    `}
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
