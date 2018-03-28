import * as Hapi from "hapi";

import { ClientSessionRepo } from "./data/client_session/clientSessionRepo";
import { container } from "./ioc/ioc";
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

  const r = await server.inject({
    app: {},
    method: "POST",
    url: "127.0.0.1:3000/login",
    payload: '{"e_mail":"hello@hello.de","password":"password"}'
  });

  logInfo("result", r.result);
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
