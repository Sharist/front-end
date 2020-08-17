import React from 'react';

import BaseCard from './BaseCard';
import styled, { css } from 'styled-components';

const CardImage = styled.img`
  ${({ theme: { palette } }) => css`
    border-radius: 50%;
    border: 0.05rem solid ${palette.cloud};
    height: 4rem;
    width: 4rem;
  `}
`;

const CardContent = styled.div`
  ${({ theme: { spacing } }) => css`
    display: flex;
    flex-direction: column;
    margin-left: ${spacing.medium};

    & * {
      margin: ${spacing.xsmall};
    }
  `}
`;

const Name = styled.p`
  ${({ theme: { typography } }) => css`
    font-size: ${typography.medium};
    font-weight: ${typography.bold};
  `}
`;

type Props = {
  description?: string;
  imageUrl?: string;
  name: string;
};

function PeopleCard({
  description,
  imageUrl = 'https://www.w3schools.com/howto/img_avatar2.png',
  name,
}: Props) {
  return (
    <BaseCard>
      <CardImage src={imageUrl} />
      <CardContent>
        <Name>{name}</Name>
        {description && <p>{description}</p>}
      </CardContent>
    </BaseCard>
  );
}

export default PeopleCard;
