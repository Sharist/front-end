import React from 'react';
import styled, { css } from 'styled-components';

import Button, { ButtonRow } from '../../../common/components/Button';
import Card, {
  CardContent,
  CardFooter,
  CardHeading,
  CardImage,
} from '../../../common/components/Card';

const PendingPlaceCardWrapper = styled(Card)`
  ${({ theme: { palette } }) => css`
    border: 0;
    box-shadow: 0 0.05rem 0.5rem ${palette.asphalt.css};
    height: 13rem;
    z-index: 10;
  `}
`;

type Props = {
  pendingPlace: google.maps.places.PlaceResult;
  onAddToTrip: () => void;
  onCancelAddToTrip: () => void;
};

function PendingPlaceCard({ onAddToTrip, onCancelAddToTrip, pendingPlace }: Props) {
  const { name, vicinity, photos } = pendingPlace;

  let imageConfig;
  if (photos) {
    const cardImageWidth = 500;
    const firstPhoto =
      photos.find(({ width, height }) => height < width && width > cardImageWidth) || photos[0];

    imageConfig = {
      url: firstPhoto.getUrl({ maxWidth: cardImageWidth }),
      cssHeight: `100%`,
    };
  }

  return (
    <PendingPlaceCardWrapper horizontal>
      {imageConfig && <CardImage imageConfig={imageConfig} />}

      <CardContent>
        <CardHeading title={name} subtitle={vicinity} />
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
      </CardContent>
    </PendingPlaceCardWrapper>
  );
}

export default PendingPlaceCard;
