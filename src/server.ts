import * as Hapi from "hapi";

import { register } from "./presentation/feature/upload_images/route";
import { Address } from "./presentation/model/address";
import { Creator } from "./presentation/model/creator";
import { Defect } from "./presentation/model/defect";
import { DefectList } from "./presentation/model/defectList";
import { Floor } from "./presentation/model/floor";
import { Image } from "./presentation/model/image";
import { LivingUnit } from "./presentation/model/livingUnit";
import { Participant } from "./presentation/model/participant";
import { Room } from "./presentation/model/room";
import { logger } from "./util/logger";

const server = new Hapi.Server({
  host: "localhost",
  port: 3000,
  routes: {
    cors: {
      origin: ["*"]
    }
  }
});

async function start(): Promise<any> {
  try {
    await server.start();
    logger.info("successful");
  } catch (err) {
    logger.info(err);
  }
}

function data(): void {
  const creator = new Creator("Mike", "Meener");
  const address = new Address("Musterstraße", 1, "a");
  const participant = new Participant(
    "Max",
    "Mustermann",
    "1234567",
    "max@mustermann.de",
    "Mustermann AG"
  );
  const image = new Image("mangel-border.jpg");
  const defect = new Defect("Ist kaputt", "Bernd", "", [{ ...image }]);
  const room = new Room("Wohnzimmer", 1, "Links neben der Küche", [
    { ...defect }
  ]);
  const livingUnit = new LivingUnit(1, [{ ...room }]);
  const floor = new Floor("EG", [{ ...livingUnit }]);
  const defectList = new DefectList(
    "1.1.1111",
    creator,
    address,
    [{ ...participant }],
    [{ ...floor }]
  );
}

data();
register(server);
start();
