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

// POST /trips
export interface CreateTripRequest {
  'sharist.trip/name': string;
  'sharist.trip/description': string;
}

export interface CreateTripResponse {
  'sharist.trip/name': string;
  'sharist.trip/description': string;
  'sharist.trip/id': string;
  'sharist.trip/owner': {
    'sharist.user/id': string;
  };
  'sharist.trip/created-at': string;
  'sharist.trip/last-updated-at': string;
}

// PUT /trips/:id
export interface UpdateTripRequest {
  'sharist.trip/name'?: string;
  'sharist.trip/description'?: string;
}
