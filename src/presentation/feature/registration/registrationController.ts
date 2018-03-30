import { RegistrationManager } from "../../../domain/feature/registration/registrationManager";
import { RegistrationData } from "../../../domain/model/registrationData";
import { provide } from "../../../ioc/ioc";
import { callAsync, matchResponse } from "../../../util/failableUtil";
import { serializeObject, serializeSafeObject } from "../../../util/jsonUtil";
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
    const response = await callAsync<string>(async ({ success, run }) => {
      const dat = run(await this.manager.execute(registrationData));

      const res = run(
        serializeObject(new ResponseModel(true, dat, []), ResponseModel)
      );

      return success(res);
    });

    const result = matchResponse(
      response,
      (data): string => {
        return data;
      },
      (error): string => {
        const model = new ResponseModel(false, {}, [
          new ErrorModel("", "", error.type, error.message)
        ]);

        return serializeSafeObject(model, ResponseModel);
      }
    );

    return result;
  }
}
