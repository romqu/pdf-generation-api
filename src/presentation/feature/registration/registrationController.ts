import { JsonObject } from "cerialize/dist/util";

import { provideSingleton } from "../../../core/ioc/ioc";
import { RegistrationManager } from "../../../domain/feature/registration/registrationManager";
import { callAsync, matchResponse } from "../../../util/failableUtil";
import {
  deserializePayload,
  serializeData,
  unsafeSerializeData
} from "../../../util/jsonUtil";
import { ErrorOut } from "../../model/errorOut";
import { Payload } from "../../model/payload";
import { RegistrationIn } from "../../model/registrationIn";
import { ResponseModel } from "../../model/responseModel";

@provideSingleton(RegistrationController)
export class RegistrationController {
  private readonly manager: RegistrationManager;

  constructor(manager: RegistrationManager) {
    this.manager = manager;
  }

  public async execute(payload: Payload): Promise<JsonObject> {
    const response = await callAsync<JsonObject>(async ({ success, run }) => {
      const registrationData = run(
        deserializePayload<RegistrationIn>(payload, RegistrationIn)
      );
      const managerResponse = run(await this.manager.execute(registrationData));

      const serializeResponse = run(
        serializeData(
          new ResponseModel(true, managerResponse, []),
          ResponseModel
        )
      );

      return success(serializeResponse);
    });

    return matchResponse(
      response,
      data => data,
      error =>
        unsafeSerializeData(
          new ResponseModel(false, null, [
            new ErrorOut("", "", error.type, error.message)
          ]),
          ResponseModel
        )
    );
  }
}
