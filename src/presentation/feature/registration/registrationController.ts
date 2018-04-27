import { RegistrationManager } from "../../../domain/feature/registration/registrationManager";
import { RegistrationData } from "../../../domain/model/registrationData";
import { provide } from "../../../ioc/ioc";
import { callAsync, matchResponse } from "../../../util/failableUtil";
import {
  deserializePayload,
  serializeObject,
  serializeSafeObject
} from "../../../util/jsonUtil";
import { ErrorModel } from "../../model/errorModel";
import { Payload } from "../../model/payload";
import { ResponseModel } from "../../model/responseModel";

@provide(RegistrationController)
  .inSingletonScope()
  .done()
export class RegistrationController {
  private readonly manager: RegistrationManager;

  constructor(manager: RegistrationManager) {
    this.manager = manager;
  }

  public async execute_(payload: Payload): Promise<string> {
    const response = await callAsync<string>(async ({ success, run }) => {
      const registrationData = run(
        deserializePayload<RegistrationData>(payload, RegistrationData)
      );
      const managerResponse = run(await this.manager.execute(registrationData));

      const serializeResponse = run(
        serializeObject(
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
        serializeSafeObject(
          new ResponseModel(false, {}, [
            new ErrorModel("", "", error.type, error.message)
          ]),
          ResponseModel
        )
    );
  }
}
