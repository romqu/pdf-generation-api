import { Lifecycle, Request, ResponseToolkit } from "hapi";

import { logger } from "../../../util/loggerUtil";

export async function loginHandler(
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> {
  const data = request.payload;

  logger.info("payload", data);

  return "";
}
