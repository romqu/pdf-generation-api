import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { LoginCredentials } from "../../../domain/model/loginCredentials";
import { container } from "../../../ioc/ioc";
import { matchResponse } from "../../../util/failableUtil";
import { deserializeObject } from "../../../util/jsonUtil";
import { logger } from "../../../util/loggerUtil";
import { LoginController } from "./loginController";

const controller = container.get(LoginController);

export async function loginHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  const payload = request.payload;

  const loginCredentials = matchResponse(
    deserializeObject<LoginCredentials>(payload, LoginCredentials),
    (data): LoginCredentials => data,
    (error): LoginCredentials => {
      throw error;
    }
  );

  logger.info("object", loginCredentials.password);

  return await controller.execute(loginCredentials);
}
