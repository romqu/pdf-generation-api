import { LoginManager } from "../../../domain/feature/login/loginManager";
import { LoginCredentials } from "../../../domain/model/loginCredentials";
import { provide } from "../../../ioc/ioc";
import { matchResponse } from "../../../util/failableUtil";
import { stringifyObject } from "../../../util/jsonUtil";
import { ErrorModel } from "../../model/errorModel";
import { LoginModel } from "../../model/loginModel";
import { ResponseModel } from "../../model/responseModel";

@provide(LoginController)
  .inSingletonScope()
  .done()
export class LoginController {
  private readonly manager: LoginManager;

  constructor(manager: LoginManager) {
    this.manager = manager;
  }

  public async execute(loginCredentials: LoginCredentials): Promise<string> {
    const response = await this.manager.execute(loginCredentials);

    const result = matchResponse(
      response,
      (data): ResponseModel<LoginModel> => {
        const model = new ResponseModel(true, data, []);

        return model;
      },
      (error): ResponseModel<LoginModel> => {
        const model = new ResponseModel(false, {} as LoginModel, [
          new ErrorModel("", "", error.type, error.message)
        ]);
        return model;
      }
    );

    return stringifyObject(result);
  }
}
