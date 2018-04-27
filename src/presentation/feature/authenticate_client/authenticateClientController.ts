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

  public async execute(token: string): Promise<boolean> {
    const response = await this.authenticateClientManager.execute(token);

    return matchResponse(response, data => data, _ => false);
  }
}
