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
    readonly id: string,
    readonly name: string,
    readonly description?: string,
    readonly createdAt?: Date,
    readonly lastUpdatedAt?: Date
  ) {
    super();
  }

  toServerModel(): Partial<TripServerModel> {
    return {
      'sharist.trip/id': this.id,
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
      id,
      name,
      description,
      createdAt ? new Date(createdAt) : undefined,
      lastUpdatedAt ? new Date(lastUpdatedAt) : undefined
    );
  }
}
