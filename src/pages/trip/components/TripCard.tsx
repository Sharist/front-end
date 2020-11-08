import React from 'react';
import styled from 'styled-components';
import Card from '../../../common/components/Card';
import { Trip } from '../types';

type Props = {
  trip: Trip;
};

const ActionRow = styled.div`
  display: flex;
`;

function TripCard({ trip }: Props) {
  return <Card title={trip.name}>{trip.description}</Card>;
}

export default TripCard;
