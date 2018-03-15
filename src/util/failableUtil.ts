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

class Failure {
  constructor(public readonly value: IResponseError) {}
}
