import * as Hapi from "hapi";

import * as Server from "./server";
import { logger } from "./util/loggerUtil";

Error.stackTraceLimit = Infinity;

async function test(server: Hapi.Server): Promise<any> {
  const r = await server.inject({
    app: {},
    method: "POST",
    url: "127.0.0.1:3000/login",
    payload: '{"e_mail":"test@1234.de","password":"adwqd ezaaa"}'
  });

  logger.info("RESULT:", r.result);
}

async function start(): Promise<any> {
  try {
    const server = await Server.init();
    server.start();
    logger.info("server started successful");

    await test(server);
  } catch (err) {
    logger.error(err);
  }
}

start();
