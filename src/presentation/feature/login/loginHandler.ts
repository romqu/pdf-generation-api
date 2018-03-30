import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { LoginCredentials } from "../../../domain/model/loginCredentials";
import { container } from "../../../ioc/ioc";
import { deserializePayload } from "../../../util/jsonUtil";
import { LoginController } from "./loginController";

const controller = container.get(LoginController);

export async function loginHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  const loginCredentials = deserializePayload<LoginCredentials>(
    request.payload,
    LoginCredentials
  );

  return await controller.execute(loginCredentials);
}
