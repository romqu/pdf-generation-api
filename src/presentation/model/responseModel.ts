import { serializeAs, serializeAsArray, serializeAsJson } from "cerialize";
import { ErrorOut } from "./errorOut";

export class ResponseModel<T> {
  @serializeAs(Boolean, "is_success")
  public readonly isSuccess: boolean;
  @serializeAsJson() public readonly data: T;
  @serializeAsArray(ErrorOut, "errors")
  public readonly errors: ErrorOut[];

  constructor(isSuccess: boolean, data: T = {} as T, errors: ErrorOut[]) {
    this.isSuccess = isSuccess;
    this.data = data;
    this.errors = errors;
  }
}
