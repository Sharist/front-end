import { get, post, put } from '../../../common/http';
import { UpsertTripRequest, GetTripResponse, GetTripsResponse, Trip } from './types';

export async function getTrips(): Promise<Trip[]> {
  // const tripsResponse: GetTripsResponse = await Promise.resolve(fakeTripsData);
  const tripsResponse: GetTripsResponse = (await get('/trips')).data;

  return tripsResponse
    .map(convertToClientModel)
    .sort((t1, t2) => t2.createdAt.valueOf() - t1.createdAt.valueOf());
}

export async function deleteTrip(toDelete: Trip) {
  // TODO: Implement when backend is ready
}

export async function createTrip(trip: Pick<Trip, 'name' | 'description'>): Promise<Trip> {
  const { data } = await post('/trips', convertToServerModel(trip));

  return convertToClientModel(data);
}

export async function replaceTrip(
  id: string,
  trip: Pick<Trip, 'name' | 'description'>
): Promise<Trip> {
  const { data } = await put(`/trips/${id}`, convertToServerModel(trip));

  return convertToClientModel(data);
}

function convertToClientModel(tripServerResponse: GetTripResponse): Trip {
  return {
    id: tripServerResponse['sharist.trip/id'],
    name: tripServerResponse['sharist.trip/name'],
    description: tripServerResponse['sharist.trip/description'],
    createdAt: new Date(tripServerResponse['sharist.trip/created-at']),
    updatedAt: new Date(tripServerResponse['sharist.trip/last-updated-at']),
  };
}

function convertToServerModel(trip: Pick<Trip, 'name' | 'description'>): UpsertTripRequest {
  return {
    'sharist.trip/name': trip.name,
    'sharist.trip/description': trip.description,
  };
}
