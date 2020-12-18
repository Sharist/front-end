/**
 * API Model blueprint.
 *
 * @template S Sever model for the API model.
 */
export abstract class ApiModel<S> {
  abstract toServerModel(): Partial<S>;

  clone(c: Partial<any>): ApiModel<S> {
    throw new Error('Operation not supported.');
  }

  static fromServerModel(s: unknown) {
    throw new Error('Operation not implemented');
  }
}
