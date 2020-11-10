import React from 'react';
import { GiAirplane } from 'react-icons/gi';
import styled, { css } from 'styled-components';

import { mixins } from '../styles/Theme';
import Button from './Button';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const EmptyStateImage = styled.div`
  ${({ theme: { palette } }) => css`
    align-items: center;
    color: ${palette.ash.darker.css};
    display: flex;
    justify-content: center;
    margin: 10rem 0 -5rem 0;
    transform: rotate(-15deg);

    & > * {
      font-size: 25rem !important;

      ${mixins.belowTablet} {
        font-size: 22rem !important;
      }
      ${mixins.belowMobile} {
        font-size: 15rem !important;
      }
    }

    ${mixins.belowMobile} {
      margin: 3rem 0 -2.5rem 0;
    }
  `}
`;

const Title = styled.p`
  ${({ theme: { typography } }) => css`
    font-size: ${typography.X_LARGE};
    margin-bottom: 0.5rem;
    text-align: center;

    ${mixins.belowMobile} {
      font-size: ${typography.LARGE};
    }
  `}
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 2rem 0;
  text-align: center;
`;

type Props = {
  title: string;
  subtitle: string;
  action?: {
    actionLabel: string;
    actionHandler: () => void;
  };
};

function EmptyState({ title, subtitle, action }: Props) {
  return (
    <Wrapper>
      <EmptyStateImage>
        <GiAirplane />
      </EmptyStateImage>

      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {action && (
        <Button onClick={action.actionHandler} isPrimary>
          {action.actionLabel}
        </Button>
      )}
    </Wrapper>
  );
}

export default EmptyState;
