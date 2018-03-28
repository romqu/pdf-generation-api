import { LoginManager } from "../../../domain/feature/login/loginManager";
import { LoginCredentials } from "../../../domain/model/loginCredentials";
import { provide } from "../../../ioc/ioc";
import { callAsync, matchResponse } from "../../../util/failableUtil";
import {
  serializeObject,
  serializeSafeObject,
  stringifyObject
} from "../../../util/jsonUtil";
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
    const response = await callAsync<string>(async ({ success, run }) => {
      const dat = run(await this.manager.execute(loginCredentials));

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
