import { get, post, put } from '../../../common/http';
import { notNullish } from '../../../common/assert';
import { Trip, TripServerModel } from './models/Trip';
import { TripPlace, TripPlaceServerModel } from './models/TripPlace';

export async function getTrip(tripId: string): Promise<Trip | null> {
  const fetchResponse = await get<TripServerModel>(`/trips/${tripId}`);
  if (fetchResponse.status === 404) {
    throw Error('Could not find trip');
  }

  const tripResponse = fetchResponse.data;
  return Trip.fromServerModel(tripResponse);
}

export async function getTripPlaces(tripId: string): Promise<TripPlace[]> {
  const { data } = await get<TripPlaceServerModel[]>(`/trips/${tripId}/places`);

  return data.map(TripPlace.fromServerModel).filter(notNullish);
}

export async function addPlaceToTrip(trip: Trip, tripPlace: TripPlace): Promise<TripPlace | null> {
  const { data } = await post<TripPlaceServerModel>(
    `/trips/${trip.id}/places`,
    tripPlace.toServerModel()
  );

  let createdTripPlace = TripPlace.fromServerModel(data);
  if (tripPlace.placeResult) {
    createdTripPlace?.attachPlaceResult(tripPlace.placeResult);
  }

  return createdTripPlace;
}

export async function getTrips(): Promise<Trip[]> {
  const { data } = await get<TripServerModel[]>('/trips');

  return data
    .map(Trip.fromServerModel)
    .filter(notNullish)
    .sort((t1, t2) => {
      if (t2.createdAt) {
        return t1.createdAt ? t2.createdAt.getTime() - t1.createdAt.getTime() : 1;
      }
      return t1.createdAt ? -1 : 0;
    });
}

export async function deleteTrip(toDelete: Trip) {
  // TODO: Implement when backend is ready
}

export async function createTrip(trip: Trip): Promise<Trip | null> {
  const { data } = await post<TripServerModel>('/trips', trip.toServerModel());

  return Trip.fromServerModel(data);
}

export async function replaceTrip(trip: Trip): Promise<Trip | null> {
  if (!trip.id) {
    throw new Error(`Trip id not found.`);
  }

  const { data } = await put<TripServerModel>(`/trips/${trip.id}`, trip.toServerModel());

  return Trip.fromServerModel(data);
}
