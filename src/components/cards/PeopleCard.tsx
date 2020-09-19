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
    border: 0.05rem solid ${palette.ASH};
    height: 4rem;
    width: 4rem;
  `}
`;

const CardContent = styled.div`
  ${({ theme: { typography } }) => css`
    display: flex;
    flex-direction: column;
    line-height: ${typography.MEDIUM};
    margin-left: 1rem;
    height: calc(${typography.MEDIUM} * 4);

    & > * {
      margin: 0.25rem;
    }
  `}
`;

const Name = styled.p`
  ${({ theme: { typography } }) => css`
    font-size: ${typography.MEDIUM};
    font-weight: bold;
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
          <Text maxLine={2} lineHeight={SharistTheme.typography.MEDIUM}>
            {description}
          </Text>
        )}
      </CardContent>
    </Card>
  );
}

export default PeopleCard;
