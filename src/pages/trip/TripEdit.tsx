import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { addPlaceToTrip, getTrip, getTripPlaces } from './common/api';
import { SearchResult } from '../../common/components/search/SearchResultItem';
import { Trip } from './common/models/Trip';
import { TripPlace } from './common/models/TripPlace';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import BackLink from '../../common/components/BackLink';
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
  display: flex;
  align-items: center;
  padding: 0 0rem 0 0;
  margin: 1rem 0rem;

  & > * {
    margin: 0 0.15rem;
    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }
`;

type Props = RouteComponentProps & {
  tripId?: string;
};

function TripEdit({ tripId }: Props) {
  const [pendingPlace, setPendingPlace] = useState<google.maps.places.PlaceResult | null>();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [tripPlaces, setTripPlaces] = useState<TripPlace[]>([]);

  const { signedIn } = useAuthentication();
  const { mapAdaptor, mapInstance, mapSearchDataSource } = useContext(MapContext);

  useEffect(() => {
    // Cleanup the map if navigated away.
    return function cleanUp() {
      if (pendingPlace) {
        mapAdaptor?.removeMarkers(pendingPlace);
      }
    };
  }, [pendingPlace, mapAdaptor]);

  useEffect(() => {
    if (tripId && !trip) {
      getTrip(tripId)
        .then(setTrip)
        .catch((error) => {
          // TODO: error message
          alert(`Failed to fetch trip ID ${tripId}; reason: ${error.message}.`);
          routes.tripList.navigator();
        })
        .then(() => getTripPlaces(tripId))
        .then(setTripPlaces)
        .catch((error) => {
          // TODO: error message
          alert(`Failed to fetch places for trip ID ${tripId}; reason: ${error.message}.`);
          routes.tripList.navigator();
        })
        .finally(() => console.log(`trip places: ${tripPlaces}`));
    }
  }, [trip, tripId, tripPlaces]);

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
    if (pendingPlace) {
      addPlaceToTrip(trip!, TripPlace.fromPlaceResult(pendingPlace)!);
      setPendingPlace(null);
    }
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
            <BackLink routeLink={routes.tripList.navigator} tooltipLabel='Back to trips' />
            <Search
              placeholder='Search cities, attractions, or keywords'
              dataSource={mapSearchDataSource}
              onSelectAutocompleteResult={handleAutoCompleteResultSelected}
              onFullSearchResult={handleFullSearch}
            />
          </SearchHeader>

          {/* {pendingPlace && (
            <>
              <PlaceListShade onClick={handleCancelAddToTripClick} />
              <PendingPlaceCard
                pendingPlace={pendingPlace}
                onAddToTrip={handleAddToTripClick}
                onCancelAddToTrip={handleCancelAddToTripClick}
              />
            </>
          )} */}
        </PlaceList>

        <IMap
          topOverlay={
            pendingPlace && (
              <PendingPlaceCard
                pendingPlace={pendingPlace}
                onAddToTrip={handleAddToTripClick}
                onCancelAddToTrip={handleCancelAddToTripClick}
              />
            )
          }
        />
      </Content>
    </LayoutContainer>
  );
}

export default TripEdit;
