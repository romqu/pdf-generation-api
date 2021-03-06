import "reflect-metadata";

import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { container } from "../../../core/ioc/ioc";
import { LoginController } from "./loginController";

const controller = container.get(LoginController);

export async function loginHandler(
  request: Request,
  _: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  return await controller.execute(request.payload);
}
