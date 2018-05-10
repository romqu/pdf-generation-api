import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { container } from "../../../ioc/ioc";
import { logInfo } from "../../../util/loggerUtil";
import { LoginController } from "./loginController";

const controller = container.get(LoginController);

export async function loginHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  logInfo("HERE", "dwqdwqdwqdwqdwqd");

  return await controller.execute(request.payload);
}
