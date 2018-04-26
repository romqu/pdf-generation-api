import { container } from "../../../ioc/ioc";
import { AuthenticateClientController } from "./authenticateClientController";

const controller = container.get(AuthenticateClientController);

export async function authenticateClientHandler(
  request: any,
  token: any,
  h: any
): Promise<any> {
  const isValid = await controller.execute(token);

  const credentials = { token };

  return { isValid, credentials };
}
