import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { getTrip } from './common/api';
import { SearchResult } from '../../common/components/search/SearchResultItem';
import { Trip } from './common/models/Trip';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import IMap from '../../common/components/IMap';
import LayoutContainer from '../../common/components/LayoutContainer';
import MapContext from '../../common/contexts/MapContext';
import PendingPlaceCard from './components/PendingPlaceCard';
import routes from '../../routes';
import Search from '../../common/components/search/Search';

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const PlaceList = styled.div`
  box-shadow: 0 0 0.5rem grey;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  position: relative;
  padding: 0.5rem 1.5rem;
  width: 30rem;
  z-index: 1;
`;

const SearchHeader = styled.div`
  padding: 0.75rem 0;
`;

type Props = RouteComponentProps & {
  tripId?: string;
};

function TripEdit({ tripId }: Props) {
  const [pendingPlace, setPendingPlace] = useState<google.maps.places.PlaceResult | null>();

  const [edittingTrip, setEdittingTrip] = useState<Trip | null>(null);

  const { signedIn } = useAuthentication();
  const { mapAdaptor, mapInstance, mapSearchDataSource } = useContext(MapContext);

  useEffect(() => {
    if (tripId && !edittingTrip) {
      getTrip(tripId).then(setEdittingTrip);
    }
  }, [edittingTrip, tripId]);

  // Do not render if not signed in
  if (!signedIn) {
    return null;
  }

  // Return to trip selection page if tripId is not specified
  if (!tripId) {
    routes.tripList.navigator();
  }

  async function handleAutoCompleteResultSelected(searchResult: SearchResult) {
    if (mapAdaptor && mapInstance && searchResult.key) {
      if (pendingPlace) {
        mapAdaptor.removeMarkers(pendingPlace);
      }

      try {
        const place = await mapAdaptor.getPlaceDetail(searchResult.key);
        if (place.geometry?.location) {
          mapAdaptor.addMarkers(place);
          mapInstance.setCenter(place.geometry.location);
          mapInstance.setZoom(17);
        }

        setPendingPlace(place);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  async function handleFullSearch(searchResults: SearchResult[]) {
    console.log(searchResults);
  }

  function handleAddToTripClick() {
    setPendingPlace(null);
  }

  function handleCancelAddToTripClick() {
    if (pendingPlace) {
      mapAdaptor?.removeMarkers(pendingPlace);
    }
    setPendingPlace(null);
  }

  return (
    <LayoutContainer fullHeight noHeader noMargin noPadding>
      <Content>
        <PlaceList>
          <SearchHeader>
            <Search
              hasLogo
              placeholder='Search cities, attractions, or keywords'
              dataSource={mapSearchDataSource}
              onSelectAutocompleteResult={handleAutoCompleteResultSelected}
              onFullSearchResult={handleFullSearch}
            />
          </SearchHeader>

          {pendingPlace && (
            <PendingPlaceCard
              pendingPlace={pendingPlace}
              onAddToTrip={handleAddToTripClick}
              onCancelAddToTrip={handleCancelAddToTripClick}
            />
          )}
        </PlaceList>

        <IMap />
      </Content>
    </LayoutContainer>
  );
}

export default TripEdit;
