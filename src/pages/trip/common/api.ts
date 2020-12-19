import { get, post, put } from '../../../common/http';
import { notNullish } from '../../../common/assert';
import { Trip, TripServerModel } from './models/Trip';

export async function getTrip(tripId: string): Promise<Trip | null> {
  const tripResponse: TripServerModel = (await get(`/trips/${tripId}`)).data;

  return Trip.fromServerModel(tripResponse);
}

export async function getTrips(): Promise<Trip[]> {
  const tripsResponse: TripServerModel[] = (await get('/trips')).data;

  return tripsResponse
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
  const { data } = await post('/trips', trip.toServerModel());

  return Trip.fromServerModel(data);
}

export async function replaceTrip(trip: Trip): Promise<Trip | null> {
  if (!trip.id) {
    throw new Error(`Trip id not found.`);
  }

  const { data } = await put(`/trips/${trip.id}`, trip.toServerModel());

  return Trip.fromServerModel(data);
}

export async function getTripPlaces(tripId: string) {}
