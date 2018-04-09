import * as Hapi from "hapi";

import { ClientRepo } from "./data/client/clienRepo";
import { container } from "./ioc/ioc";
import * as Server from "./server";
import { logInfo } from "./util/loggerUtil";
import { CreateFullDefectListRepo } from "./data/create_full_defect_list/createFullDefectListRepo";

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

  // const converter = new Stream.Writable();
  // converter.data = [];

  // converter._write = (
  //   chunk: any,
  //   encoding: string,
  //   callback: (err?: Error) => void
  // ): void => {
  //   converter.data.push(chunk);
  //   callback();
  // };

  // converter.on("finish", async () => {
  //   const payload = Buffer.concat(converter.data);

  //   const req = {
  //     app: {},
  //     method: "POST",
  //     url: "/images",
  //     headers: form.getHeaders(),
  //     payload
  //   };

  //   const result = await server.inject(req);

  //   // logInfo("result", result.result);
  // });

  // const form = new FormData();

  // // const s = fs.createReadStream("./assets/images/mangel.jpg");
  // const file = fs.readFileSync("./assets/images/mangel.jpg");

  // form.append("json", JSON.stringify({ json: "json" }), {
  //   contentType: "application/json"
  // });

  // for (let i = 0; i < 2; i++) {
  //   form.append("images", fs.createReadStream("./assets/images/mangel.jpg"));
  // }

  // form.pipe(converter);

  // const result = await container.get(CreateFullDefectListRepo).test();

  container.get(CreateFullDefectListRepo).test();

  // logInfo("Result", result.isSuccess ? result.data.forename : result);
}

async function start(): Promise<any> {
  try {
    const server = await Server.init();
    server.start();
    logInfo("server started successful");
    await test(server);
  } catch (err) {
    logInfo(err);
  }
}

start();
