import { serialize, serializeAs } from "cerialize";

import { ErrorModel } from "./errorModel";

export class ResponseModel<T> {
  @serializeAs(Boolean, "is_success")
  public readonly isSuccess: boolean;
  @serialize public readonly data: T;
  @serializeAs(Boolean, "errors")
  public readonly errors: ErrorModel[];

  constructor(isSuccess: boolean, data: T = {} as T, errors: ErrorModel[]) {
    this.isSuccess = isSuccess;
    this.data = data;
    this.errors = errors;
  }
}
