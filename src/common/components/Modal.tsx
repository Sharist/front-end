import React, { createRef, ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';
import styled, { css } from 'styled-components';

import { generateRandomKey } from '../forms';
import { mixins } from '../styles/Theme';
import Button, { ButtonRow } from './Button';

const Backdrop = styled.div<{ isVisible: boolean }>`
  ${({ isVisible, theme: { palette } }) => css`
    align-items: center;
    background-color: ${palette.grey.alpha(0.5).css};
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
  ${({ theme: { palette } }) => css`
    background-color: ${palette.white.css};
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem ${palette.grey.css};
    padding: 1rem;
    min-width: 20rem;

    ${mixins.belowMobile} {
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
  margin-top: 0.5rem;
  padding: 1rem;
`;

interface ActionButtonConfig {
  isPrimary?: boolean;
  label: string;
  onClick: () => void;
}

type Props = {
  cancelAction: () => void;
  cancelButtonText?: string;
  children: ReactNode;
  confirmAction: () => void;
  confirmActionLoading?: boolean;
  confirmButtonText?: string;
  hasCloseButton?: boolean;
  hide?: () => void;
  isVisible: boolean;
  show?: () => void;
  title?: string;
};

function Modal({
  cancelAction,
  cancelButtonText = 'Cancel',
  children,
  confirmAction,
  confirmActionLoading = false,
  confirmButtonText = 'Confirm',
  isVisible,
  hasCloseButton = false,
  title,
  hide,
}: Props) {
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

        <ModalActionsWrapper>
          <ButtonRow>
            <Button
              disabled={confirmActionLoading}
              key={generateRandomKey({ prefix: cancelButtonText })}
              onClick={cancelAction}
            >
              {cancelButtonText}
            </Button>
            <Button
              key={generateRandomKey({ prefix: confirmButtonText })}
              isLoading={confirmActionLoading}
              isPrimary
              onClick={() => confirmAction()}
            >
              {confirmButtonText}
            </Button>
          </ButtonRow>
        </ModalActionsWrapper>
      </ModalWrapper>
    </Backdrop>
  );
}

export default Modal;
