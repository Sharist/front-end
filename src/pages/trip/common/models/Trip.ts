import { ApiModel } from '../../../../common/apis/ApiModel';

export interface TripServerModel {
  'sharist.trip/id': string;
  'sharist.trip/name': string;
  'sharist.trip/description': string;
  'sharist.trip/created-at': string;
  'sharist.trip/last-updated-at': string;
}

export class Trip extends ApiModel<TripServerModel> {
  constructor(
    /** Name of the trip */
    readonly name: string,
    /** Description of the trip */
    readonly description: string = '',
    /** Server ID for this trip */
    readonly id?: string,
    /** Date this trip was create. thius is only updated on server. */
    readonly createdAt?: Date,
    /** Date this trip was last updated. This is only updated on server. */
    readonly lastUpdatedAt?: Date
  ) {
    super();
  }

  clone(updatedValue: Partial<Trip>): Trip {
    const { name, description } = {
      ...this,
      ...updatedValue,
    };

    return new Trip(name, description, this.id, this.createdAt, this.lastUpdatedAt);
  }

  toServerModel(): Partial<TripServerModel> {
    return {
      'sharist.trip/name': this.name,
      'sharist.trip/description': this.description,
    };
  }

  static fromServerModel(serverModel: Partial<TripServerModel>) {
    const id = serverModel['sharist.trip/id'];
    const name = serverModel['sharist.trip/name'];
    const description = serverModel['sharist.trip/description'];
    const createdAt = serverModel['sharist.trip/created-at'];
    const lastUpdatedAt = serverModel['sharist.trip/last-updated-at'];

    if (!(id && name)) {
      return null;
    }

    return new Trip(
      name,
      description,
      id,
      createdAt ? new Date(createdAt) : undefined,
      lastUpdatedAt ? new Date(lastUpdatedAt) : undefined
    );
  }
}
