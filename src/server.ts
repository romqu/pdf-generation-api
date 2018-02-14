import * as Hapi from "hapi";
import { Lifecycle } from "hapi";
import * as Http2 from "http2";
import { logger } from "./logger";

const server = new Hapi.Server({
  host: "localhost",
  port: "/var/run/pdf-gen-api/ap.sock",
  listener: Http2.createServer()
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
