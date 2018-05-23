import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { container } from "../../../ioc/ioc";
import { RegistrationController } from "./registrationController";

const controller = container.get(RegistrationController);

export async function registrationHandler(
  request: Request,
  _: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  return await controller.execute(request.payload);
}
