export interface IError {
  readonly type: string;
  readonly code: number;
  readonly title: string;
  readonly message: string;
  readonly stack: string;
}

export interface IErrorIn {
  readonly type: string;
  readonly code: number;
  readonly title: string;
}
