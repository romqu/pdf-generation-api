import { serializeAs } from "cerialize";
export class ErrorOut {
  // http error code
  @serializeAs(String) public readonly status: string;
  // application-specific error code
  @serializeAs(String) public readonly code: string;
  // a short, human-readable summary of the problem
  @serializeAs(String) public readonly title: string;
  // a human-readable explanation specific to this occurrence of the problem
  @serializeAs(String) public readonly detail: string;

  constructor(status: string, code: string, title: string, detail: string) {
    this.status = status;
    this.code = code;
    this.title = title;
    this.detail = detail;
  }
}
