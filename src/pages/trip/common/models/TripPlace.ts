import { ApiModel } from '../../../../common/apis/ApiModel';
import { User, UserServerModel } from '../../../user/common/models/User';
import { Trip, TripServerModel } from './Trip';

export interface TripPlaceServerModel {
  'sharist.place/id': string;
  'sharist.place/name': string;
  'google.maps/lat': string;
  'google.maps/lng': string;
  'google.maps/place_id': string;
  'sharist.place/creator': UserServerModel;
  'sharist.place/of-trip': TripServerModel;
}

export class TripPlace extends ApiModel<TripPlaceServerModel> {
  constructor(
    /** Place ID that uniquely identifies this place on Google Maps */
    readonly placeId: string,
    /** Name of this place, typically from Google Maps */
    readonly name: string,
    /** Google Maps LatLng model */
    readonly location: google.maps.LatLng,
    /** Server ID for this TripPlace */
    readonly id?: string,
    /** The user who created this TripPlace */
    readonly creator?: User,
    /** Trip this place associates with */
    readonly ofTrip?: Trip,
    /** Place result that maps to this trip place */
    readonly placeResult?: google.maps.places.PlaceResult
  ) {
    super();

    if (placeResult?.place_id !== placeId) {
      throw new Error(
        `The supplied placeId "${placeId}" is not the same as placeResult.place_id "${placeResult?.place_id}"`
      );
    }
  }

  /** Make a copy of this TripPlace with updated value. */
  clone(valuesToUpdate: Partial<TripPlace>): TripPlace {
    const { placeId, name, location, id }: TripPlace = {
      ...this,
      ...valuesToUpdate,
    };

    return new TripPlace(placeId, name, location, id, this.creator);
  }

  /**
   * Attach Google Maps PlaceResult to this trip place when available.
   *
   * This method creates a clone for immutability.
   */
  attachPlaceResult(placeResult: google.maps.places.PlaceResult): TripPlace {
    return this.clone({ placeResult });
  }

  /**
   * Converts to server model for API requests.
   */
  toServerModel(): Partial<TripPlaceServerModel> {
    return {
      'sharist.place/name': this.name,
      'google.maps/lat': this.location.lat().toString(),
      'google.maps/lng': this.location.lng().toString(),
      'google.maps/place_id': this.placeId,
    };
  }

  /**
   * Convert Google Maps Place data into local model.
   *
   * @param place Google maps place result
   */
  static fromPlaceResult(place: google.maps.places.PlaceResult): TripPlace | null {
    const { place_id, name, geometry } = place;
    if (!place_id || !name || !geometry) {
      return null;
    }

    return new TripPlace(place_id, name, geometry.location, undefined, undefined, undefined, place);
  }

  /**
   * Convert API response from the server into local model.
   *
   * @param serverModel API response
   */
  static fromServerModel(serverModel: Partial<TripPlaceServerModel>): TripPlace | null {
    const id = serverModel['sharist.place/id'];
    const name = serverModel['sharist.place/name'];
    const lat = parseFloat(serverModel['google.maps/lat'] || '');
    const lng = parseFloat(serverModel['google.maps/lng'] || '');
    const placeId = serverModel['google.maps/place_id'];

    const creator =
      serverModel['sharist.place/creator'] &&
      User.fromServerModel(serverModel['sharist.place/creator']);

    const ofTrip =
      (serverModel['sharist.place/of-trip'] &&
        Trip.fromServerModel(serverModel['sharist.place/of-trip'])) ||
      undefined;

    const validCoordinates = lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    if (!(id && name && placeId && creator && validCoordinates)) {
      return null;
    }

    const location = new google.maps.LatLng(lat, lng);

    return new TripPlace(placeId, name, location, id, creator, ofTrip, undefined);
  }
}
