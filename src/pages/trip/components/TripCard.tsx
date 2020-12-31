import React, { useRef } from 'react';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import styled, { css } from 'styled-components';

import { remToPx } from '../../../common/dimensions';
import { Trip } from '../common/models/Trip';
import Card, { CardContent, CardFooter, CardHeading } from '../../../common/components/Card';
import routes from '../../../routes';
import Tooltip from '../../../common/components/Tooltip';

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
  onDelete: () => void;
  onEdit: () => void;
};

function TripCard({ trip, onDelete, onEdit }: Props) {
  const editIconRef = useRef<HTMLAnchorElement>(null);
  const deleteIconRef = useRef<HTMLAnchorElement>(null);

  return (
    <Card
      onClick={() => {
        routes.tripEdit.navigator({ tripId: trip.id });
      }}
    >
      <CardContent>
        <CardHeading title={trip.name} subtitle={trip.description} />
        <CardFooter noSeparator>
          <ActionRow>
            <ActionIcon
              ref={editIconRef}
              onClick={(e) => {
                onEdit();
                e.stopPropagation();
              }}
            >
              <Tooltip anchor={editIconRef} text='Edit trip' />
              <IoMdCreate size={remToPx(1.25)} />
            </ActionIcon>
            <ActionIcon
              ref={deleteIconRef}
              onClick={(e) => {
                onDelete();
                e.stopPropagation();
              }}
            >
              <Tooltip anchor={deleteIconRef} text='Delete trip' />
              <IoMdTrash size={remToPx(1.25)} />
            </ActionIcon>
          </ActionRow>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default TripCard;
