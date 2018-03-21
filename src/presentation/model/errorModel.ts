export class ErrorModel {
  // http error code
  public readonly status: string;
  // application-specific error code
  public readonly code: string;
  // a short, human-readable summary of the problem
  public readonly title: string;
  // a human-readable explanation specific to this occurrence of the problem
  public readonly detail: string;

  constructor(status: string, code: string, title: string, detail: string) {
    this.status = status;
    this.code = code;
    this.title = title;
    this.detail = detail;
  }
}
