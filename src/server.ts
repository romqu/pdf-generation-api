import fs = require("fs");
import * as Hapi from "hapi";
import { Lifecycle } from "hapi";
import * as Http2 from "http2";
import { logger } from "./logger";

const options = {
  key: fs.readFileSync("./self-signed-certs/key.key"),
  cert: fs.readFileSync("./self-signed-certs/crt.crt")
};

const server = new Hapi.Server({
  host: "localhost",
  port: 3000,
  listener: Http2.createSecureServer(options),
  tls: true
});

server.route({
  method: "GET",
  path: "/",
  options: {},
  handler: (request, h): Lifecycle.ReturnValue => ({ hello: "hello" })
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
