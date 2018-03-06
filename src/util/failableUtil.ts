import { Response } from "../domain/model/response";
import { logger } from "./loggerUtil";

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

export async function callAsync<T>(
  f: ((
    arg: {
      success(value: T): Promise<Response<T>>;
      failure(error: string): Promise<Response<T>>;
      run<R>(response: Response<R>): Promise<R>;
      failable<R>(func: () => Promise<R>): Promise<Response<R>>;
    }
  ) => Promise<Response<T>>)
): Promise<Response<T>> {
  try {
    return await f({
      success(value: T): Promise<Response<T>> {
        return Promise.resolve<Response<T>>({
          isSuccess: true,
          data: value
        });
      },
      failure(e: string): Promise<Response<T>> {
        return Promise.resolve<Response<T>>({
          isSuccess: false,
          errorMessage: e
        });
      },
      run<R>(response: Response<R>): Promise<R> {
        if (!response.isSuccess) {
          throw new Failure(response.errorMessage);
        } else {
          return Promise.resolve<R>(response.data);
        }
      },
      async failable<R>(func: () => Promise<R>): Promise<Response<R>> {
        try {
          const result = await func();
          return { isSuccess: true, data: result };
        } catch (error) {
          throw new Failure(error.toString());
        }
      }
    });
  } catch (e) {
    if (e instanceof Failure) {
      return Promise.resolve<Response<T>>({
        isSuccess: false,
        errorMessage: e.value
      });
    } else {
      throw e;
    }
  }
}

class Failure {
  constructor(public readonly value: string) {}
}
