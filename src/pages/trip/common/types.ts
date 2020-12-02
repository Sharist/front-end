export interface Trip {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
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
