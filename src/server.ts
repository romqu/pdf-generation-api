import * as Hapi from "hapi";

import { register } from "./presentation/feature/create_pdf/route";
import { logger } from "./util/logger";

const server = new Hapi.Server({
  host: "localhost",
  port: 3000,
  routes: {
    cors: {
      origin: ["*"]
    }
  }
});

async function start(): Promise<any> {
  try {
    await server.start();
    logger.info("successful");
  } catch (err) {
    logger.info(err);
  }
}

register(server);
start();
