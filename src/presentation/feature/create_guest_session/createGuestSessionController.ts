import { JsonObject } from "cerialize/dist/util";

import { CreateGuestSessionManager } from "../../../domain/feature/create_guest_session/createGuestSessionManager";
import { provide } from "../../../ioc/ioc";
import { callAsync, matchResponse } from "../../../util/failableUtil";
import { serializeData, unsafeSerializeData } from "../../../util/jsonUtil";
import { ErrorOut } from "../../model/errorOut";
import { ResponseModel } from "../../model/responseModel";

@provide(CreateGuestSessionController)
  .inSingletonScope()
  .done()
export class CreateGuestSessionController {
  private readonly manager: CreateGuestSessionManager;

  constructor(manager: CreateGuestSessionManager) {
    this.manager = manager;
  }

  public async execute(): Promise<JsonObject> {
    const response = await callAsync<JsonObject>(async ({ success, run }) => {
      const managerResponse = run(await this.manager.execute());

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
            new ErrorOut("", "", error.type, error.message)
          ]),
          ResponseModel
        )
    );
  }
}
