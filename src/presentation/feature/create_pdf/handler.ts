import { Lifecycle, Request, ResponseToolkit } from "hapi";

export async function createPdfHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  const data = request.payload;

  return data;
}
