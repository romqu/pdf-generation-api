import { Lifecycle, Request, ResponseToolkit } from "hapi";

export async function testHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  return request.params.id;
}
