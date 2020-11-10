import { CreateTripResponse, GetTripResponse, GetTripsResponse, Trip } from './types';
import { generateRandomKey } from '../../common/forms';

export async function getTrips(): Promise<Trip[]> {
  const tripsResponse: GetTripsResponse = await Promise.resolve([
    {
      'sharist.trip/id': generateRandomKey(),
      'sharist.trip/name': 'San Diego',
      'sharist.trip/description': '2 day trip',
      'sharist.trip/created-at': '2020-09-26T15:07:16Z',
      'sharist.trip/last-updated-at': '2020-09-26T15:07:16Z',
    },
    {
      'sharist.trip/id': generateRandomKey(),
      'sharist.trip/name': 'San Diego',
      'sharist.trip/description': '2 day trip',
      'sharist.trip/created-at': '2020-09-26T15:07:16Z',
      'sharist.trip/last-updated-at': '2020-09-26T15:07:16Z',
    },
    {
      'sharist.trip/id': generateRandomKey(),
      'sharist.trip/name': 'San Diego',
      'sharist.trip/description': '2 day trip',
      'sharist.trip/created-at': '2020-09-26T15:07:16Z',
      'sharist.trip/last-updated-at': '2020-09-26T15:07:16Z',
    },
    {
      'sharist.trip/id': generateRandomKey(),
      'sharist.trip/name': 'San Diego',
      'sharist.trip/description': '2 day trip',
      'sharist.trip/created-at': '2020-09-26T15:07:16Z',
      'sharist.trip/last-updated-at': '2020-09-26T15:07:16Z',
    },
    {
      'sharist.trip/id': generateRandomKey(),
      'sharist.trip/name': 'San Diego',
      'sharist.trip/description': '2 day trip',
      'sharist.trip/created-at': '2020-09-26T15:07:16Z',
      'sharist.trip/last-updated-at': '2020-09-26T15:07:16Z',
    },
  ]);

  return tripsResponse.map(convert);
}

export async function createTrip(name: string, description: string = ''): Promise<Trip> {
  // TODO: Hook this up with API
  // const createTripRequest: CreateTripRequest = {
  //   'sharist.trip/name': name,
  //   'sharist.trip/description': description,
  // };

  const date = new Date().toISOString();
  const createTripResponse: CreateTripResponse = await Promise.resolve({
    'sharist.trip/name': name,
    'sharist.trip/description': description,
    'sharist.trip/id': generateRandomKey(),
    'sharist.trip/owner': {
      'sharist.user/id': generateRandomKey(),
    },
    'sharist.trip/created-at': date,
    'sharist.trip/last-updated-at': date,
  });

  return convert(createTripResponse);
}

function convert(tripServerResponse: GetTripResponse | CreateTripResponse): Trip {
  return {
    id: tripServerResponse['sharist.trip/id'],
    name: tripServerResponse['sharist.trip/name'],
    description: tripServerResponse['sharist.trip/description'],
    createdAt: new Date(tripServerResponse['sharist.trip/created-at']),
    updatedAt: new Date(tripServerResponse['sharist.trip/last-updated-at']),
  };
}
