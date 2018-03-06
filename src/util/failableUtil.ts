import { Response } from "../domain/model/response";

export async function failableAsync<R>(
  func: () => Promise<R>
): Promise<Response<R>> {
  try {
    const result = await func();
    return { isSuccess: true, data: result };
  } catch (error) {
    return { isSuccess: false, errorMessage: error.toString() };
  }
}

export function failable<R>(func: () => R): Response<R> {
  try {
    const result = func();
    return { isSuccess: true, data: result };
  } catch (error) {
    return { isSuccess: false, errorMessage: error.toString() };
  }
}

export function makeSuccessResponse<T>(dataP: T): Response<T> {
  return { isSuccess: true, data: dataP };
}

export function makeFailureResponse(errorMessageP: string): Response<string> {
  return { isSuccess: false, errorMessage: errorMessageP };
}

function call<T = never, E = never>(
  f: ((
    arg: {
      success(value: T): Failable<T, E>;
      failure(error: E): Failable<T, E>;
      run<R>(failable: Failable<R, E>): R;
    }
  ) => Failable<T, E>)
): Failable<T, E> {
  try {
    return f({
      success(value) {
        return {
          isError: false,
          value: value
        };
      },
      failure(e) {
        return {
          isError: true,
          error: e
        };
      },
      run(failable) {
        if (failable.isError) {
          throw new Failure(failable.error);
        } else {
          return failable.value;
        }
      }
    });
  } catch (e) {
    if (e instanceof Failure) {
      return {
        isError: true,
        error: e.value
      };
    } else {
      throw e;
    }
  }
}

class Failure<E> {
  constructor(public readonly value: E) {}
}

type Failable<R, E> =
  | {
      isError: true;
      error: E;
    }
  | {
      isError: false;
      value: R;
    };
