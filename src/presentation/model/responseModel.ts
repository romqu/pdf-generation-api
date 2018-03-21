import { ErrorModel } from "./errorModel";

export class ResponseModel<T> {
  public readonly isSuccess: boolean;
  public readonly data: T;
  public readonly errors: ErrorModel[];

  constructor(isSuccess: boolean, data: T, errors: ErrorModel[]) {
    this.isSuccess = isSuccess;
    this.data = data;
    this.errors = errors;
  }
}
