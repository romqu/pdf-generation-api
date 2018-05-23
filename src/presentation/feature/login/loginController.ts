import 'reflect-metadata';

import { JsonObject } from 'cerialize/dist/util';

import { LoginManager } from '../../../domain/feature/login/loginManager';
import { LoginCredentials } from '../../../domain/model/loginCredentials';
import { provide } from '../../../ioc/ioc';
import { callAsync, matchResponse } from '../../../util/failableUtil';
import { deserializePayload, serializeData, unsafeSerializeData } from '../../../util/jsonUtil';
import { ErrorModel } from '../../model/errorModel';
import { Payload } from '../../model/payload';
import { ResponseModel } from '../../model/responseModel';

@provide(LoginController)
  .inSingletonScope()
  .done()
export class LoginController {
  private readonly manager: LoginManager;

  constructor(manager: LoginManager) {
    this.manager = manager;
  }

  public async execute(payload: Payload): Promise<JsonObject> {
    const response = await callAsync<JsonObject>(async ({ success, run }) => {
      const loginCredentials = run(
        deserializePayload<LoginCredentials>(payload, LoginCredentials)
      );
      const managerResponse = run(await this.manager.execute(loginCredentials));

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
            new ErrorModel("", "", error.type, error.message)
          ]),
          ResponseModel
        )
    );
  }
}
