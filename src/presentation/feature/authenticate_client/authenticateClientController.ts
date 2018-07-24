import { provideSingleton } from "../../../core/ioc/ioc";
import { AuthenticateClientManager } from "../../../domain/feature/authenticate_client/authenticateClientManager";
import { matchResponse } from "../../../util/failableUtil";

@provideSingleton(AuthenticateClientController)
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
