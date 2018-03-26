import * as Hapi from "hapi";

import * as Server from "./server";
import { logger } from "./util/loggerUtil";
import { container } from "./ioc/ioc";
import { DiskDataSource } from "./data/diskDataSource";

Error.stackTraceLimit = Infinity;

async function test(server: Hapi.Server): Promise<any> {
  const r = await server.inject({
    app: {},
    method: "POST",
    url: "127.0.0.1:3000/registration",
    payload:
      '{"loginCredentials":{"email":"test@saewqdwq.de","password":"adwqd ezaaa"},"client":{"forename":"zfzu","surname":"Meier"}}'
  });

  logger.info("RESULT:", r.result);
}

async function start(): Promise<any> {
  try {
    const server = await Server.init();
    server.start();
    logger.info("server started successful");
    // await test(server);
  } catch (err) {
    logger.error(err);
  }
}

async function testA(): Promise<any> {
  // const a = await new LoginCredentialsRepo(
  //   new DiskDataSource(pgDb)
  // ).getPasswordHashByEmail("test@1234.de");
  // logger.info(a);
  container.get<DiskDataSource>(DiskDataSource).test();
}

testA();
// start();
