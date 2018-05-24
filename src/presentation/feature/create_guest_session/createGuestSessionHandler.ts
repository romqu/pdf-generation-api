import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { container } from "../../../ioc/ioc";
import { CreateGuestSessionController } from "./createGuestSessionController";

const controller = container.get(CreateGuestSessionController);

export async function createGuestSessionHandler(
  _: Request,
  __: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  return await controller.execute();
}
