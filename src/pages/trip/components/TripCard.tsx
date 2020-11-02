import React from 'react';
import Card from '../../../common/components/Card';
import { Trip } from '../types';

type Props = {
  trip: Trip;
};

function TripCard({ trip }: Props) {
  return <Card title={trip.name}>{trip.description}</Card>;
}

export default TripCard;
