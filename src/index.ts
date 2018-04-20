import { Serialize } from "cerialize";
import * as FormData from "form-data";
import * as fs from "fs-extra";
import * as Hapi from "hapi";
import { Stream } from "stream";

import { Creator } from "./domain/model/document/creator";
import { Defect } from "./domain/model/document/defect";
import { DefectImage } from "./domain/model/document/defectImage";
import { DefectList } from "./domain/model/document/defectList";
import { Floor } from "./domain/model/document/floor";
import { LivingUnit } from "./domain/model/document/livingUnit";
import { Room } from "./domain/model/document/room";
import { StreetAddress } from "./domain/model/document/streetAddress";
import { ViewParticipant } from "./domain/model/document/viewParticipant";
import * as Server from "./server";
import { logInfo } from "./util/loggerUtil";
import { init } from "./database";

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

  const range = (n: number): number[] =>
    Array.from({ length: n }, (_, key) => key);
  const defectImageList = range(1).map(
    _ => new DefectImage("", 0, "mangel.jpg")
  );
  const defectList = range(1).map(
    _ => new Defect("Bla", "iwqd", "AG", "1995/01/01", defectImageList)
  );
  const roomList = range(1).map(_ => new Room("wqd", 1, "wqdwqd", defectList));
  const livingUnitList = range(1).map(_ => new LivingUnit(1, roomList));
  const floorList = range(1).map(_ => new Floor("EG", livingUnitList));
  const viewParticipantList = range(1).map(
    _ => new ViewParticipant("Bern", "Me", 12345, "wqdwqd@wdwqd.de", "adsadsa")
  );

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
    // logInfo("result", result.result);
  });
  const form = new FormData();
  const s = fs.createReadStream("./assets/images/mangel.jpg");
  const file = fs.readFileSync("./assets/images/mangel.jpg");

  form.append(
    "json",
    JSON.stringify(
      Serialize(
        new DefectList(
          "",
          "",
          new Creator(1),
          new StreetAddress(
            "abcd",
            1,
            "ab",
            1234567,
            floorList,
            viewParticipantList
          )
        ),
        DefectList
      )
    ),
    {
      contentType: "application/json"
    }
  );

  for (let i = 0; i < 1; i++) {
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

    await test(server);
  } catch (err) {
    logInfo(err);
  }
}

start();
