export interface IError {
  readonly code: number;
  readonly title: string;
  readonly message: string;
  readonly stack: string;
}

export interface IErrorIn {
  readonly code: number;
  readonly title: string;
}
