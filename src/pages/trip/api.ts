import {
  CreateTripResponse,
  GetTripResponse,
  GetTripsResponse,
  Trip,
  UpdateTripRequest,
} from './types';
import { generateRandomKey } from '../../common/forms';

const fakeTripsData = [
  {
    'sharist.trip/id': generateRandomKey(),
    'sharist.trip/name': 'San Diego',
    'sharist.trip/description': '2-day trip',
    'sharist.trip/created-at': '2020-09-26T15:07:16Z',
    'sharist.trip/last-updated-at': '2020-09-26T15:07:16Z',
  },
  {
    'sharist.trip/id': generateRandomKey(),
    'sharist.trip/name': 'Austin',
    'sharist.trip/description': '3-day trip',
    'sharist.trip/created-at': '2020-09-26T15:07:16Z',
    'sharist.trip/last-updated-at': '2020-09-26T15:07:16Z',
  },
  {
    'sharist.trip/id': generateRandomKey(),
    'sharist.trip/name': 'Taipei',
    'sharist.trip/description': '5-day trip',
    'sharist.trip/created-at': '2020-09-26T15:07:16Z',
    'sharist.trip/last-updated-at': '2020-09-26T15:07:16Z',
  },
  {
    'sharist.trip/id': generateRandomKey(),
    'sharist.trip/name': 'Tokyo',
    'sharist.trip/description': '5-day trip',
    'sharist.trip/created-at': '2020-09-26T15:07:16Z',
    'sharist.trip/last-updated-at': '2020-09-26T15:07:16Z',
  },
  {
    'sharist.trip/id': generateRandomKey(),
    'sharist.trip/name': 'Vienna',
    'sharist.trip/description': '3-day trip',
    'sharist.trip/created-at': '2020-09-26T15:07:16Z',
    'sharist.trip/last-updated-at': '2020-09-26T15:07:16Z',
  },
];

export async function getTrips(): Promise<Trip[]> {
  const tripsResponse: GetTripsResponse = await Promise.resolve(fakeTripsData);

  return tripsResponse
    .map(convertToClientModel)
    .sort((t1, t2) => t2.createdAt.valueOf() - t1.createdAt.valueOf());
}

export async function createTrip(trip: Pick<Trip, 'name' | 'description'>): Promise<Trip> {
  // TODO: Hook this up with API
  // const createTripRequest: CreateTripRequest = {
  //   'sharist.trip/name': name,
  //   'sharist.trip/description': description,
  // };

  const date = new Date().toISOString();
  const toCreate = {
    'sharist.trip/name': trip.name,
    'sharist.trip/description': trip.description,
    'sharist.trip/id': generateRandomKey(),
    'sharist.trip/owner': {
      'sharist.user/id': generateRandomKey(),
    },
    'sharist.trip/created-at': date,
    'sharist.trip/last-updated-at': date,
  };

  fakeTripsData.push(toCreate);

  const createTripResponse: CreateTripResponse = await Promise.resolve(toCreate);

  return convertToClientModel(createTripResponse);
}

export async function deleteTrip(toDelete: Trip) {
  const toDeleteIndex = fakeTripsData.findIndex((trip) => trip['sharist.trip/id'] === toDelete.id);

  if (toDeleteIndex >= 0) {
    fakeTripsData.splice(toDeleteIndex, 1);
  }
}

export async function editTrip(trip: Pick<Trip, 'id' | 'name' | 'description'>) {
  const toEdit = fakeTripsData.findIndex((serverTrip) => serverTrip['sharist.trip/id'] === trip.id);

  if (toEdit >= 0) {
    fakeTripsData[toEdit] = {
      ...fakeTripsData[toEdit],
      ...convertToServerModel(trip),
      'sharist.trip/last-updated-at': new Date().toISOString(),
    };
  }
}

function convertToClientModel(tripServerResponse: GetTripResponse | CreateTripResponse): Trip {
  return {
    id: tripServerResponse['sharist.trip/id'],
    name: tripServerResponse['sharist.trip/name'],
    description: tripServerResponse['sharist.trip/description'],
    createdAt: new Date(tripServerResponse['sharist.trip/created-at']),
    updatedAt: new Date(tripServerResponse['sharist.trip/last-updated-at']),
  };
}

function convertToServerModel(trip: Pick<Trip, 'name' | 'description'>): UpdateTripRequest {
  return {
    'sharist.trip/name': trip.name,
    'sharist.trip/description': trip.description,
  };
}
