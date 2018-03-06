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

function call<T>(
  f: ((
    arg: {
      success(value: T): Response<T>;
      failure(error: string): Response<T>;
      run<R>(failable: Response<R>): R;
    }
  ) => Response<T>)
): Response<T> {
  try {
    return f({
      success(value) {
        return {
          isSuccess: true,
          data: value
        };
      },
      failure(e) {
        return {
          isSuccess: false,
          errorMessage: e
        };
      },
      run(failable) {
        if (!failable.isSuccess) {
          throw new Failure(failable.errorMessage);
        } else {
          return failable.data;
        }
      }
    });
  } catch (e) {
    if (e instanceof Failure) {
      return {
        isSuccess: false,
        errorMessage: e.value
      };
    } else {
      throw e;
    }
  }
}

class Failure {
  constructor(public readonly value: string) {}
}
