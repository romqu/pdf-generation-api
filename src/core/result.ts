import { IError } from "./error";

export type Result<T> = IFailure | ISuccess<T>;

export type ResultPromise<T> = Promise<Result<T>>;

export interface IFailure {
  readonly isSuccess: false;
  readonly error: IError;
}

export interface ISuccess<T> {
  readonly isSuccess: true;
  readonly data: T;
}

export interface IResultError {
  readonly tag: string;
  readonly value: Error;
}
