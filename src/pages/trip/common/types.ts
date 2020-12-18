/**
 * Client models.
 */
export interface Trip {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TripPlace {
  id: string;
  name: string;
  location: google.maps.LatLng;
  placeId: string;
  creator: {
    id: string;
    email: string;
  };
}

/**
 * API models.
 */
// GET /trips/:id
export interface GetTripResponse {
  'sharist.trip/id': string;
  'sharist.trip/name': string;
  'sharist.trip/description': string;
  'sharist.trip/created-at': string;
  'sharist.trip/last-updated-at': string;
}

// GET /trips
export type GetTripsResponse = GetTripResponse[];

// POST /trips or PUT /trips
export interface UpsertTripRequest {
  'sharist.trip/name': string;
  'sharist.trip/description': string;
}
