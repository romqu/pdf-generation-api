import { RegistrationManager } from "../../../domain/feature/registration/registrationManager";
import { RegistrationData } from "../../../domain/model/registrationData";
import { ResponsePromise } from "../../../domain/model/response";

export class RegistrationController {
  private readonly manager: RegistrationManager;

  constructor(manager: RegistrationManager) {
    this.manager = manager;
  }

  public execute(registrationData: RegistrationData): ResponsePromise<string> {
    return this.manager.execute(registrationData);
  }
}
