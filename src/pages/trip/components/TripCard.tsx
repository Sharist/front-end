import React from 'react';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import styled, { css } from 'styled-components';

import { remToPx } from '../../../common/dimensions';
import { Trip } from '../types';
import Card, { CardFooter, CardHeader } from '../../../common/components/Card';

const ActionRow = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  position: absolute;
`;

const ActionIcon = styled.a`
  ${({ theme: { palette } }) => css`
    align-items: center;
    border-radius: 50%;
    color: ${palette.ash.darker.css};
    cursor: pointer;
    display: flex;
    height: 1.75rem;
    justify-content: center;
    width: 1.75rem;

    &:hover {
      background-color: ${palette.ash.css};
      color: ${palette.asphalt.css};
    }
  `}
`;

type Props = {
  trip: Trip;
};

function TripCard({ trip }: Props) {
  return (
    <Card title={trip.name}>
      <CardHeader title={trip.name} subtitle={trip.description} />
      <CardFooter noSeparator>
        <ActionRow>
          <ActionIcon>
            <IoMdCreate size={remToPx(1.25)} />
          </ActionIcon>
          <ActionIcon>
            <IoMdTrash size={remToPx(1.25)} />
          </ActionIcon>
        </ActionRow>
      </CardFooter>
    </Card>
  );
}

export default TripCard;
