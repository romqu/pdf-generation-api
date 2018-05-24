import { AuthenticateClientManager } from "../../../domain/feature/authenticate_client/authenticateClientManager";
import { provide } from "../../../ioc/ioc";
import { matchResponse } from "../../../util/failableUtil";

@provide(AuthenticateClientController)
  .inSingletonScope()
  .done()
export class AuthenticateClientController {
  private readonly authenticateClientManager: AuthenticateClientManager;

  constructor(authenticateClientManager: AuthenticateClientManager) {
    this.authenticateClientManager = authenticateClientManager;
  }

  public async execute(token: string, path: string): Promise<boolean> {
    const response = await this.authenticateClientManager.execute(token, path);

    return matchResponse(response, data => data, _ => false);
  }
}
