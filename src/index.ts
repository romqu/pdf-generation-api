import * as Hapi from "hapi";

import { CreateFullDefectListRepo } from "./data/create_full_defect_list/createFullDefectListRepo";
import { DefectEntity } from "./data/create_full_defect_list/defectEntity";
import { DefectListEntity } from "./data/create_full_defect_list/defectListEntity";
import { FloorEntity } from "./data/create_full_defect_list/floorEntity";
import { LivingUnitEntity } from "./data/create_full_defect_list/livingUnitEntity";
import { RoomEntity } from "./data/create_full_defect_list/roomEntity";
import { StreetAddressEntity } from "./data/create_full_defect_list/streetAddressEntity";
import { ViewParticipantEntity } from "./data/create_full_defect_list/viewParticipantEntity";
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

  const result = await container
    .get(CreateFullDefectListRepo)
    .insert(
      new DefectListEntity(
        0,
        "347931649sadwqddwq",
        1,
        new StreetAddressEntity(
          0,
          12345,
          "qrwwqq",
          45,
          "av",
          0,
          [
            new FloorEntity(0, "EG", 0, [
              new LivingUnitEntity(0, 45, 0, [
                new RoomEntity(0, "Zimmer", 1, "DAAAA", 0, [
                  new DefectEntity(
                    0,
                    "kapuut",
                    "np",
                    "weare",
                    "3333-01-01",
                    0,
                    []
                  )
                ])
              ])
            ])
          ],
          [
            new ViewParticipantEntity(
              0,
              "me",
              "too",
              123455,
              "rrew@rewrew.de",
              "berta ag",
              0
            )
          ]
        )
      )
    );

  logInfo("Result", result.isSuccess ? result.data : result);
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
