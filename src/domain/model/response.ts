import { IError } from "./error";

export type Response<T> = IFailure | ISuccess<T>;

export type ResponsePromise<T> = Promise<Response<T>>;

export interface IFailure {
  readonly isSuccess: false;
  readonly error: IError;
}

export interface ISuccess<T> {
  readonly isSuccess: true;
  readonly data: T;
}

export interface IResponseError {
  readonly tag: string;
  readonly value: Error;
}
