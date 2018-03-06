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
