import { Deserialize } from "cerialize";
import { Lifecycle, ResponseToolkit } from "hapi";

import { RegistrationData } from "../../../domain/model/registrationData";
import { logger } from "../../../util/loggerUtil";

export async function registrationHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  const data = request.payload;

  const registrationData: RegistrationData = Deserialize(
    data,
    RegistrationData
  );

  logger.info("registration data:", registrationData);

  return registrationData;
}
