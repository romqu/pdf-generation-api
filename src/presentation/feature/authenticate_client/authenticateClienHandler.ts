import { container } from "../../../ioc/ioc";
import { AuthenticateClientController } from "./authenticateClientController";

const controller = container.get(AuthenticateClientController);

export async function authenticateClientHandler(
  __: any,
  token: any,
  _: any
): Promise<any> {
  const isValid = await controller.execute(token);

  const credentials = { token };

  return { isValid, credentials };
}
