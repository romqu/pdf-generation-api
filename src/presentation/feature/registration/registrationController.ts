import { RegistrationManager } from "../../../domain/feature/registration/registrationManager";
import { RegistrationData } from "../../../domain/model/registrationData";
import { matchResponse } from "../../../util/failableUtil";
import { ErrorModel } from "../../model/errorModel";
import { ResponseModel } from "../../model/responseModel";

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
          new ErrorModel("", "", error.tag, error.value.message)
        ]);
        return model;
      }
    );

    return JSON.stringify(result);
  }
}
