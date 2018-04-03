import * as FormData from "form-data";
import * as fs from "fs";
import * as Hapi from "hapi";
import * as Stream from "stream";

import * as Server from "./server";
import { logInfo } from "./util/loggerUtil";

Error.stackTraceLimit = Infinity;

async function test(server: Hapi.Server): Promise<any> {
  // const register = await server.inject({
  //   app: {},
  //   method: "POST",
  //   url: "127.0.0.1:3000/registration",
  //   payload:
  //     '{"loginCredentials":{"e_mail":"hello@hello.de","password":"password"},"client":{"forename":"zfzu","surname":"Meier"}}'
  // });

  // const r = await server.inject({
  //   app: {},
  //   method: "POST",
  //   url: "127.0.0.1:3000/login",
  //   payload: '{"e_mail":"hello@hello.de","password":"password"}'
  // });

  const converter = new Stream.Writable();
  converter.data = [];

  converter._write = (
    chunk: any,
    encoding: string,
    callback: (err?: Error) => void
  ): void => {
    converter.data.push(chunk);
    callback();
  };

  converter.on("finish", async () => {
    const payload = Buffer.concat(converter.data);

    const req = {
      app: {},
      method: "POST",
      url: "/images",
      headers: form.getHeaders(),
      payload
    };

    const result = await server.inject(req);
  });

  const form = new FormData();

  form.append("images", fs.createReadStream("./assets/images/mangel.jpg"));

  form.pipe(converter);
}

async function start(): Promise<any> {
  try {
    const server = await Server.init();
    server.start();
    logInfo("server started successful");
    // await test(server);
  } catch (err) {
    logInfo(err);
  }
}

start();
