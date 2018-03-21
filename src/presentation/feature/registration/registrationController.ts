import { RegistrationManager } from "../../../domain/feature/registration/registrationManager";
import { RegistrationData } from "../../../domain/model/registrationData";
import { ResponsePromise } from "../../../domain/model/response";
import { matchResponse } from "../../../util/failableUtil";

export class RegistrationController {
  private readonly manager: RegistrationManager;

  constructor(manager: RegistrationManager) {
    this.manager = manager;
  }

  public async execute(
    registrationData: RegistrationData
  ): ResponsePromise<string> {
    const result = await this.manager.execute(registrationData);

    matchResponse(result, { onSuccess });

    return result;
  }
}
