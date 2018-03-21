import {
  IResponseError,
  Response,
  ResponsePromise
} from "../domain/model/response";

export async function callAsync<T = never>(
  f: ((
    arg: {
      success(data: T): ResponsePromise<T>;
      failure(errorTag: string, errorMessage: string): ResponsePromise<T>;
      run<R>(response: Response<R>): R;
      failable<R>(
        errorTag: string,
        func: () => Promise<R>
      ): Promise<Response<R>>;
    }
  ) => ResponsePromise<T>)
): ResponsePromise<T> {
  return await f({
    success(data: T): ResponsePromise<T> {
      return Promise.resolve<Response<T>>({
        isSuccess: true,
        // tslint:disable-next-line:object-literal-shorthand
        data: data
      });
    },
    failure(errorTag: string, errorMessage: string): ResponsePromise<T> {
      return Promise.resolve<Response<T>>({
        isSuccess: false,
        error: { tag: errorTag, value: new Error(errorMessage) }
      });
    },
    run<R>(response: Response<R>): R {
      if (response.isSuccess) {
        return response.data;
      } else {
        throw new Failure(response.error);
      }
    },
    async failable<R>(
      errorTag: string,
      func: () => Promise<R>
    ): ResponsePromise<R> {
      try {
        const result = await func();
        return { isSuccess: true, data: result };
      } catch (err) {
        return {
          isSuccess: false,
          error: { tag: errorTag, value: new Error(err.toString()) }
        };
      }
    }
  }).catch(e => {
    if (e instanceof Failure) {
      return Promise.resolve<Response<T>>({
        isSuccess: false,
        error: e.value
      });
    } else {
      return Promise.reject(e);
    }
  });
}

export function call<T = never>(
  f: ((
    arg: {
      success(data: T): Response<T>;
      failure(errorTag: string, errorMessage: string): Response<T>;
      run<R>(response: Response<R>): R;
      failable<R>(errorTag: string, func: () => R): Response<R>;
    }
  ) => Response<T>)
): Response<T> {
  try {
    return f({
      success(data: T): Response<T> {
        return {
          isSuccess: true,
          // tslint:disable-next-line:object-literal-shorthand
          data: data
        };
      },
      failure(errorTag: string, errorMessage: string): Response<T> {
        return {
          isSuccess: false,
          error: { tag: errorTag, value: new Error(errorMessage) }
        };
      },
      run<R>(response: Response<R>): R {
        if (response.isSuccess) {
          return response.data;
        } else {
          throw new Failure(response.error);
        }
      },
      failable<R>(errorTag: string, func: () => R): Response<R> {
        try {
          const result = func();
          return { isSuccess: true, data: result };
        } catch (err) {
          return {
            isSuccess: false,
            error: { tag: errorTag, value: new Error(err.toString()) }
          };
        }
      }
    });
  } catch (e) {
    if (e instanceof Failure) {
      return {
        isSuccess: false,
        error: e.value
      };
    } else {
      throw e;
    }
  }
}

class Failure {
  constructor(public readonly value: IResponseError) {}
}

export function failable<R>(errorTag: string, func: () => R): Response<R> {
  try {
    const result = func();
    return { isSuccess: true, data: result };
  } catch (err) {
    return {
      isSuccess: false,
      error: { tag: errorTag, value: new Error(err.toString()) }
    };
  }
}

export async function failableAsync<R>(
  errorTag: string,
  func: () => Promise<R>
): ResponsePromise<R> {
  try {
    const result = await func();
    return { isSuccess: true, data: result };
  } catch (err) {
    return {
      isSuccess: false,
      error: { tag: errorTag, value: new Error(err.toString()) }
    };
  }
}

export function matchResponse<T, R>(
  response: Response<T>,
  cases: IResponseMatchCase<T, R>
): R {
  if (response.isSuccess) {
    return cases.onSuccess(response.data);
  }

  return cases.onFailure(response.error);
}

interface IResponseMatchCase<T, R> {
  onFailure: (error: IResponseError) => R;

  /**
   * Callback that is called in case of success.
   * It is passed the success value of the result.
   */
  onSuccess: (data: T) => R;
}
