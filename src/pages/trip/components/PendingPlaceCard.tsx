import React from 'react';

import { remToPx } from '../../../common/dimensions';
import Button, { ButtonRow } from '../../../common/components/Button';
import Card, { CardFooter, CardHeader } from '../../../common/components/Card';

type Props = {
  pendingPlace: google.maps.places.PlaceResult;
  onAddToTrip: () => void;
  onCancelAddToTrip: () => void;
};

function PendingPlaceCard({ onAddToTrip, onCancelAddToTrip, pendingPlace }: Props) {
  const { name, vicinity, photos } = pendingPlace;
  let imageConfig;

  if (photos) {
    const cardImageHeight = remToPx(15);
    const firstPhoto =
      photos.find(({ width, height }) => height < width && height > cardImageHeight) || photos[0];

    imageConfig = {
      url: firstPhoto.getUrl({ maxHeight: cardImageHeight }),
      cssHeight: `${cardImageHeight}px`,
    };
  }

  return (
    <Card>
      <CardHeader image={imageConfig} title={name} subtitle={vicinity} />
      <CardFooter>
        <ButtonRow>
          <Button onClick={onCancelAddToTrip} transparent>
            Cancel
          </Button>
          <Button onClick={onAddToTrip} isPrimary>
            Add to trip
          </Button>
        </ButtonRow>
      </CardFooter>
    </Card>
  );
}

export default PendingPlaceCard;
