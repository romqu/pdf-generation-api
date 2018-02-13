import * as Hapi from "hapi";
import { Lifecycle } from "hapi";
import { logger } from "./logger";

const server = new Hapi.Server({
  host: "localhost",
  port: 3000
});

server.route({
  method: "GET",
  path: "/",
  options: {},
  handler: (request, h): Lifecycle.ReturnValue => "HELLO WORLD"
});

async function start(): Promise<any> {
  try {
    await server.start();
    logger.info("successful");
  } catch (err) {
    logger.info(err);
  }
}

start();
