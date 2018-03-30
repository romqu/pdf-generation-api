import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { IError } from "../../../domain/model/error";
import { RegistrationData } from "../../../domain/model/registrationData";
import { container } from "../../../ioc/ioc";
import { matchResponseAsync } from "../../../util/failableUtil";
import {
  deserializePayload,
  serializeSafeObject
} from "../../../util/jsonUtil";
import { logInfo } from "../../../util/loggerUtil";
import { ErrorModel } from "../../model/errorModel";
import { ResponseModel } from "../../model/responseModel";
import { RegistrationController } from "./registrationController";

const controller = container.get(RegistrationController);

export async function registrationHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  const payload = deserializePayload<RegistrationData>(
    "request.payload",
    RegistrationData
  );

  logInfo(
    "AAAAAAAAAAAAAA",
    payload.isSuccess ? payload.data.client.forename : payload.error.title
  );

  return await matchResponseAsync<RegistrationData, string>(
    payload,
    (data: RegistrationData) => controller.execute(data),
    (error: IError) =>
      Promise.resolve(
        serializeSafeObject(
          new ResponseModel<string>(false, "", [
            new ErrorModel(error.title, "", "", "")
          ]),
          ResponseModel
        )
      )
  );
}
