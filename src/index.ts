import { Serialize } from "cerialize";
import * as FormData from "form-data";
import * as fs from "fs-extra";
import * as Hapi from "hapi";
import { Stream } from "stream";

import { DefectList } from "./domain/model/document/defectList";
import * as Server from "./server";
import { createTestDataFull } from "./util/defectListUtil";
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
      url: "/pdf",
      headers: form.getHeaders(),
      payload
    };
    const result = await server.inject(req);
    // logInfo("result", result.result);
  });
  const form = new FormData();
  const s = fs.createReadStream("./assets/images/mangel.jpg");
  const file = fs.readFileSync("./assets/images/mangel.jpg");

  form.append(
    "json",
    JSON.stringify(Serialize(createTestDataFull(), DefectList)),
    {
      contentType: "application/json"
    }
  );

  for (let i = 0; i < 3; i++) {
    form.append("images", fs.createReadStream("./assets/images/mangel.jpg"));
  }
  form.pipe(converter);

  // const result = await container.get(CreateFullDefectListRepo).test();
  // const result = await container
  //   .get(CreateFullDefectListRepo)
  //   .insert(
  //     new DefectListEntity(
  //       0,
  //       "347931649sadwqddwq",
  //       1,
  //       new Date(),
  //       new StreetAddressEntity(
  //         0,
  //         12345,
  //         "qrwwqq",
  //         45,
  //         "av",
  //         0,
  //         [
  //           new FloorEntity(0, "EG", 0, [
  //             new LivingUnitEntity(0, 45, 0, [
  //               new RoomEntity(0, "Zimmer", 1, "DAAAA", 0, [
  //                 new DefectEntity(
  //                   0,
  //                   "kapuut",
  //                   "np",
  //                   "weare",
  //                   "3333-01-01",
  //                   0,
  //                   []
  //                 )
  //               ])
  //             ])
  //           ])
  //         ],
  //         [
  //           new ViewParticipantEntity(
  //             0,
  //             "me",
  //             "too",
  //             123455,
  //             "rrew@rewrew.de",
  //             "berta ag",
  //             0
  //           )
  //         ]
  //       )
  //     )
  //   );
  // container
  //   .get(CreateDefectListFoldersTask)
  //   .execute(getSha256Hash(), [generateUuidv4()]);
  // logInfo("Result", result.isSuccess ? result.data : result);
}

async function start(): Promise<any> {
  try {
    const server = await Server.init();
    server.start();

    logInfo("server started successful");

    // const r = await container
    //   .get(ClientSessionRepo)
    //   .get({ key: "bc870b2e-2475-4517-81b8-d57463775432" });

    // logInfo("r", r.isSuccess ? r.data : r.error);

    // await test(server);
  } catch (err) {
    logInfo(err);
  }
}

start();
