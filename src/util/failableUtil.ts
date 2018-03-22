import { IError, IErrorIn } from "../domain/model/error";
import { Response, ResponsePromise } from "../domain/model/response";

export async function callAsync<T = never>(
  f: ((
    arg: {
      success(data: T): ResponsePromise<T>;
      failure(error: IError): ResponsePromise<T>;
      run<R>(response: Response<R>): R;
      failable<R>(
        error: IErrorIn,
        func: () => Promise<R>
      ): Promise<Response<R>>;
    }
  ) => ResponsePromise<T>)
): ResponsePromise<T> {
  return await f({
    success(data: T): ResponsePromise<T> {
      return Promise.resolve<Response<T>>({
        isSuccess: true,
        data
      });
    },
    failure(err: IError): ResponsePromise<T> {
      const e = new Error();
      const stack = typeof e.stack === "string" ? e.stack : "";
      return Promise.resolve<Response<T>>({
        isSuccess: false,
        error: { ...err, stack }
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
      error: IErrorIn,
      func: () => Promise<R>
    ): ResponsePromise<R> {
      try {
        const result = await func();
        return { isSuccess: true, data: result };
      } catch (err) {
        const e = new Error();
        const stack = typeof e.stack === "string" ? e.stack : "";

        return {
          isSuccess: false,
          error: {
            type: error.type,
            code: error.code,
            title: error.title,
            message: err.toString(),
            stack
          }
        };
      }
    }
  }).catch(e => {
    if (e instanceof Failure) {
      return Promise.resolve<Response<T>>({
        isSuccess: false,
        error: e.error
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
      failure(error: IError): Response<T>;
      run<R>(response: Response<R>): R;
      failable<R>(error: IErrorIn, func: () => R): Response<R>;
    }
  ) => Response<T>)
): Response<T> {
  try {
    return f({
      success(data: T): Response<T> {
        return {
          isSuccess: true,
          data
        };
      },
      failure(error: IError): Response<T> {
        return {
          isSuccess: false,
          error
        };
      },
      run<R>(response: Response<R>): R {
        if (response.isSuccess) {
          return response.data;
        } else {
          throw new Failure(response.error);
        }
      },
      failable<R>(error: IErrorIn, func: () => R): Response<R> {
        try {
          const result = func();
          return { isSuccess: true, data: result };
        } catch (err) {
          const e = new Error();
          const stack = typeof e.stack === "string" ? e.stack : "";

          return {
            isSuccess: false,
            error: {
              type: error.type,
              code: error.code,
              title: error.title,
              message: err.toString(),
              stack
            }
          };
        }
      }
    });
  } catch (e) {
    if (e instanceof Failure) {
      return {
        isSuccess: false,
        error: e.error
      };
    } else {
      throw e;
    }
  }
}

class Failure {
  constructor(public readonly error: IError) {}
}

export function failable<R>(error: IErrorIn, func: () => R): Response<R> {
  try {
    const result = func();
    return { isSuccess: true, data: result };
  } catch (err) {
    const e = new Error();
    const stack = typeof e.stack === "string" ? e.stack : "";

    return {
      isSuccess: false,
      error: {
        type: error.type,
        code: error.code,
        title: error.title,
        message: err.toString(),
        stack
      }
    };
  }
}

export async function failableAsync<R>(
  error: IErrorIn,
  func: () => Promise<R>
): ResponsePromise<R> {
  try {
    const result = await func();
    return { isSuccess: true, data: result };
  } catch (err) {
    const e = new Error();
    const stack = typeof e.stack === "string" ? e.stack : "";

    return {
      isSuccess: false,
      error: {
        type: error.type,
        code: error.code,
        title: error.title,
        message: err.toString(),
        stack
      }
    };
  }
}

export function matchResponse<T, R>(
  response: Response<T>,
  onSuccess: (data: T) => R,
  onFailure: (error: IError) => R
): R {
  if (response.isSuccess) {
    return onSuccess(response.data);
  }

  return onFailure(response.error);
}
