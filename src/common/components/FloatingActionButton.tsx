import React, { useRef } from 'react';
import { IconType } from 'react-icons';
import styled, { css } from 'styled-components';

import Button from './Button';
import Tooltip from './Tooltip';

const Wrapper = styled.div<{ isContextual: boolean }>`
  ${({ isContextual }) => css`
    align-items: center;
    display: flex;

    ${!isContextual && 'position: fixed; bottom: 1rem; right: 1rem;'};
  `}
`;

const BaseFab = styled(Button)`
  ${({ theme: {} }) => css`
    align-items: center;
    border-radius: 50%;
    display: flex;
    height: 4rem;
    justify-content: center;
    width: 4rem;
  `}
`;

type Props = {
  icon: IconType;
  isContextual?: boolean;
  isPrimary?: boolean;
  label?: string;
  onClick?: () => void;
};

function FloatingActionButton({
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
      <BaseFab buttonRef={buttonRef} isPrimary={isPrimary} onClick={onClick}>
        <Icon size='2.25rem' />
      </BaseFab>
    </Wrapper>
  );
}

export default FloatingActionButton;
