import { Deserialize } from "cerialize";
import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { RegistrationData } from "../../../domain/model/registrationData";
import { logger } from "../../../util/loggerUtil";

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

  

  return registrationData;
}
