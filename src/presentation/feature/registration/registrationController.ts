import { RegistrationManager } from "../../../domain/feature/registration/registrationManager";
import { RegistrationData } from "../../../domain/model/registrationData";
import { provide } from "../../../ioc/ioc";
import { matchResponse } from "../../../util/failableUtil";
import { stringifyObject } from "../../../util/jsonUtil";
import { ErrorModel } from "../../model/errorModel";
import { ResponseModel } from "../../model/responseModel";

@provide(RegistrationController)
  .inSingletonScope()
  .done()
export class RegistrationController {
  private readonly manager: RegistrationManager;

  constructor(manager: RegistrationManager) {
    this.manager = manager;
  }

  public async execute(registrationData: RegistrationData): Promise<string> {
    const response = await this.manager.execute(registrationData);

    const result = matchResponse(
      response,
      (data): ResponseModel<string> => {
        const model = new ResponseModel(true, data, []);

        return model;
      },
      (error): ResponseModel<string> => {
        const model = new ResponseModel(false, "", [
          new ErrorModel("", "", error.type, error.message)
        ]);
        return model;
      }
    );

    return stringifyObject(result);
  }
}
