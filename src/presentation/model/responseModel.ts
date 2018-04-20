import { serializeAs, serializeAsArray, serializeAsJson } from "cerialize";

import { ErrorModel } from "./errorModel";

export class ResponseModel<T> {
  @serializeAs(Boolean, "is_success")
  public readonly isSuccess: boolean;
  @serializeAsJson() public readonly data: T;
  @serializeAsArray(ErrorModel, "errors")
  public readonly errors: ErrorModel[];

  constructor(isSuccess: boolean, data: T = {} as T, errors: ErrorModel[]) {
    this.isSuccess = isSuccess;
    this.data = data;
    this.errors = errors;
  }
}
