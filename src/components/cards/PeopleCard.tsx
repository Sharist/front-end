import React from 'react';
import styled, { css } from 'styled-components';

import BaseCard from './BaseCard';
import Text from '../Text';
import { SharistTheme } from '../../common/themes';

const Card = styled(BaseCard)`
  align-items: center;
  display: flex;
`;

const CardImage = styled.img`
  ${({ theme: { palette } }) => css`
    border-radius: 50%;
    border: 0.05rem solid ${palette.cloud};
    height: 4rem;
    width: 4rem;
  `}
`;

const CardContent = styled.div`
  ${({ theme: { spacing, typography } }) => css`
    display: flex;
    flex-direction: column;
    line-height: ${typography.medium};
    margin-left: ${spacing.medium};
    height: calc(${typography.medium} * 4);

    & > * {
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
    <Card>
      <CardImage src={imageUrl} />
      <CardContent>
        <Name>{name}</Name>
        {description && (
          <Text maxLine={2} lineHeight={SharistTheme.typography.medium}>
            {description}
          </Text>
        )}
      </CardContent>
    </Card>
  );
}

export default PeopleCard;
