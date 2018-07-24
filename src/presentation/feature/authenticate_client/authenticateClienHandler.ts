import { container } from "../../../core/ioc/ioc";
import { AuthenticateClientController } from "./authenticateClientController";

const controller = container.get(AuthenticateClientController);

export async function authenticateClientHandler(
  h: any,
  token: any,
  _: any
): Promise<any> {
  const isValid = await controller.execute(token, h.path);

  const credentials = { token };

  return { isValid, credentials };
}
