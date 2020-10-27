import React, { createRef, ReactChild } from 'react';
import { IoMdClose } from 'react-icons/io';
import styled, { css } from 'styled-components';

import { randomInputName } from '../common/forms';
import { toRgba } from '../common/themes';
import Button from './Button';

const Backdrop = styled.div<{ isVisible: boolean }>`
  ${({ isVisible, theme: { palette } }) => css`
    align-items: center;
    background-color: ${toRgba(palette.GREY, 0.5)};
    display: ${isVisible ? 'flex' : 'none'};
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `};
`;

const ModalWrapper = styled.div`
  ${({ theme: { breakpoints, palette } }) => css`
    background-color: ${palette.WHITE};
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem ${palette.GREY};
    padding: 1rem;
    min-width: 20rem;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      width: 95%;
      min-width: unset;
    }
  `}
`;

const ModalHeader = styled.div`
  border-radius: 0.5rem 0.5rem 0 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.div`
  ${({ theme: { typography } }) => css`
    font-weight: 500;
    text-align: left;
    font-size: ${typography.MEDIUM};
  `}
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const ModalActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  padding: 0.5rem;

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

interface ActionButtonConfig {
  isPrimary?: boolean;
  label: string;
  onClick: () => void;
}

type Props = {
  actions?: ActionButtonConfig[];
  children?: ReactChild | ReactChild[];
  hasCloseButton?: boolean;
  hide?: () => void;
  isVisible: boolean;
  show?: () => void;
  title?: string;
};

function Modal({ actions, children, isVisible, hasCloseButton = false, title, show, hide }: Props) {
  const backdropRef = createRef<HTMLDivElement>();

  document.body.style.overflow = isVisible ? 'hidden' : 'visible';

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === backdropRef.current) {
      hide?.();
    }
  }

  const hasModalHeader = hasCloseButton || title;

  return (
    <Backdrop ref={backdropRef} isVisible={isVisible} onClick={handleBackdropClick}>
      <ModalWrapper>
        {hasModalHeader && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>

            {hasCloseButton && (
              <CloseButton>
                <IoMdClose onClick={hide} />
              </CloseButton>
            )}
          </ModalHeader>
        )}

        {children}

        {actions && (
          <ModalActionsWrapper>
            {actions.map(({ isPrimary, onClick, label }) => (
              <Button
                key={randomInputName({ prefix: label })}
                isPrimary={isPrimary}
                onClick={onClick}
              >
                {label}
              </Button>
            ))}
          </ModalActionsWrapper>
        )}
      </ModalWrapper>
    </Backdrop>
  );
}

export default Modal;
