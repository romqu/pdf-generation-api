export type Response<T> = IFailure | ISuccess<T>;

export interface IFailure {
  readonly isSuccess: false;
  readonly errorMessage: string;
}

export interface ISuccess<T> {
  readonly isSuccess: true;
  readonly data: T;
}

export type ResponseTwo<T, E> = IFailureTwo<E> | ISuccess<T>;

export interface IFailureTwo<E> {
  readonly isSuccess: false;
  readonly error: E;
}

export interface ISuccess<T> {
  readonly isSuccess: true;
  readonly data: T;
}

export class FailureTwo<E> {
  constructor(public readonly value: E) {}
}
