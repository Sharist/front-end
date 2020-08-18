import React, { ReactChild } from 'react';
import styled, { css } from 'styled-components';

const CardWrapper = styled.div`
  ${({ theme: { palette, spacing, typography } }) => css`
    background-color: white;
    border-radius: 0.5rem;
    border: 0.05rem solid ${palette.cloud};
    box-shadow: 0 0.1rem 0.2rem ${palette.cloudLighter};
    cursor: pointer;
    display: flex;
    padding: ${spacing.large};

    &:hover {
      box-shadow: 0 0.25rem 0.3rem ${palette.cloudLighter};
      transform: translateY(-0.05rem);
    }

    &:active {
      box-shadow: 0 0.1rem 0.2rem ${palette.cloud};
      transform: translateY(0.05rem);
    }
  `}
`;

type Props = {
  className?: string;
  children?: ReactChild[];
};

function BaseCard({ className, children }: Props) {
  return <CardWrapper className={className}>{children}</CardWrapper>;
}

export default BaseCard;
