import "reflect-metadata";

import { LoginManager } from "../../../domain/feature/login/loginManager";
import { LoginCredentials } from "../../../domain/model/loginCredentials";
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

@provide(LoginController)
  .inSingletonScope()
  .done()
export class LoginController {
  private readonly manager: LoginManager;

  constructor(manager: LoginManager) {
    this.manager = manager;
  }

  public async execute(payload: Payload): Promise<string> {
    const response = await callAsync<string>(async ({ success, run }) => {
      const loginCredentials = run(
        deserializePayload<LoginCredentials>(payload, LoginCredentials)
      );
      const managerResponse = run(await this.manager.execute(loginCredentials));

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
