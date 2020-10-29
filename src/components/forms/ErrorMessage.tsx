import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
import styled, { css } from 'styled-components';

const ErrorMessageWrapper = styled.p`
  ${({ theme: { palette, typography } }) => css`
    align-items: center;
    color: ${palette.SUN};
    display: flex;
    font-size: ${typography.SMALL};
    margin: 0.25rem 0;
  `}
`;

const WarningIcon = styled(MdErrorOutline)`
  ${({ theme: { typography } }) => css`
    font-size: ${typography.REGULAR};
  `}
`;

type Props = {
  message: string;
};

function ErrorMessage({ message }: Props) {
  return (
    <ErrorMessageWrapper>
      <WarningIcon />
      &nbsp;
      {message}
    </ErrorMessageWrapper>
  );
}

export default ErrorMessage;
