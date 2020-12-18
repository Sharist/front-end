import { ApiModel } from '../../../../common/apis/ApiModel';
import { User, UserServerModel } from '../../../user/common/models/User';

export interface TripPlaceServerModel {
  'sharist.place/id': string;
  'sharist.place/name': string;
  'google.maps/lat': string;
  'google.maps/lng': string;
  'google.maps/place_id': string;
  'sharist.place/creator': UserServerModel;
}

export class TripPlace extends ApiModel<TripPlaceServerModel> {
  constructor(
    readonly placeId: string,
    readonly name: string,
    readonly location: google.maps.LatLng,
    readonly id?: string,
    readonly creator?: User
  ) {
    super();
  }

  clone(valuesToUpdate: Partial<TripPlace>): TripPlace {
    const { placeId, name, location, id }: TripPlace = {
      ...this,
      ...valuesToUpdate,
    };

    return new TripPlace(placeId, name, location, id, this.creator);
  }

  /**
   * Converts to server model for API requests.
   */
  toServerModel(): Partial<TripPlaceServerModel> {
    return {
      'sharist.place/name': this.name,
      'google.maps/lat': this.location.lat.toString(),
      'google.maps/lng': this.location.lng.toString(),
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

    const location = geometry.location;

    return new TripPlace(place_id, name, location);
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

    const validCoordinates = lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    if (!(id && name && placeId && creator && validCoordinates)) {
      return null;
    }

    const location = new google.maps.LatLng(lat, lng);

    return new TripPlace(placeId, name, location, id, creator);
  }
}
