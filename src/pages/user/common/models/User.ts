import { ApiModel } from '../../../../common/apis/ApiModel';

export interface UserServerModel {
  'sharist.user/id': string;
  'sharist.user/email': string;
  'sharist.user/last-signed-in': string;
}

export class User extends ApiModel<UserServerModel> {
  constructor(readonly id: string, readonly email: string, readonly lastSignedIn?: Date) {
    super();
  }

  toServerModel(): Partial<UserServerModel> {
    return {
      'sharist.user/id': this.id,
      'sharist.user/email': this.email,
    };
  }

  static fromServerModel(serverModel: Partial<UserServerModel>): User | null {
    const id = serverModel['sharist.user/id'];
    const email = serverModel['sharist.user/email'];
    const lastSignedIn = serverModel['sharist.user/last-signed-in'];

    if (!(id && email)) {
      return null;
    }

    return new User(id, email, lastSignedIn ? new Date(lastSignedIn) : undefined);
  }
}
