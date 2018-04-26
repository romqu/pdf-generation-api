import { ClientSessionRepo } from "../../../data/client_session/clientSessionRepo";
import { provide } from "../../../ioc/ioc";
import { callAsync } from "../../../util/failableUtil";
import { ResponsePromise } from "../../model/response";

@provide(AuthenticateClientManager)
  .inSingletonScope()
  .done()
export class AuthenticateClientManager {
  private readonly clientSessionRepo: ClientSessionRepo;

  constructor(clientSessionRepo: ClientSessionRepo) {
    this.clientSessionRepo = clientSessionRepo;
  }

  public execute(sessionUuid: string): ResponsePromise<boolean> {
    return callAsync(async ({ success, run }) => {
      run(await this.clientSessionRepo.get({ key: sessionUuid }));

      return success(true);
    });
  }
}
