export type Response<T> = IFailure | ISuccess<T>;

export interface IFailure {
  readonly isSuccess: false;
  readonly errorMessage: string;
}

export interface ISuccess<T> {
  readonly isSuccess: true;
  readonly data: T;
}
