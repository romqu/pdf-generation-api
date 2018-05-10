import { Serialize } from "cerialize";
import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { ResponseModel } from "../../model/responseModel";

export async function testHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  const r = new ResponseModel(true, "data", []);

  return Serialize(r, ResponseModel);
}
