import { Lifecycle, Request, ResponseToolkit } from "hapi";
import { Readable } from "stream";

import { container } from "../../../ioc/ioc";
import { RegistrationController } from "./registrationController";

const controller = container.get(RegistrationController);

export async function registrationHandler(
  request: Request,
  _: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  return await controller.execute_(request.payload);
}

export type Payload = Readable | Buffer | string | object;
