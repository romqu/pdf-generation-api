import { Deserialize } from "cerialize";
import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { RegistrationData } from "../../../domain/model/registrationData";
import { container } from "../../../ioc/ioc";
import { logger } from "../../../util/loggerUtil";
import { RegistrationController } from "./registrationController";

const controller = container.get(RegistrationController);

export async function registrationHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  const data = request.payload;

  logger.info("payload", data);

  const registrationData: RegistrationData = Deserialize(
    data,
    RegistrationData
  );

  const result = await controller.execute(registrationData);

  return result;
}
