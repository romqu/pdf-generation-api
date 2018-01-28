import { Defect } from "./model/defect";
import { Floor } from "./model/floor";
import { Image } from "./model/image";
import { LivingUnit } from "./model/livingUnit";
import { Room } from "./model/room";

class CreateDoc {
  constructor(
    private readonly params: {
      readonly imageBasePath: string;
    }
  ) {}

  public execute(): void {
    const imageList: Image[] = [];
    const defectList: Defect[] = [];
    const roomList: Room[] = [];
    const livingUnitList: LivingUnit[] = [];
    const floorList: Floor[] = [];

    for (let i = 0; i < 3; i++) {
      imageList.push(new Image({ name: "mangel-border.jpg" }));
    }

    defectList.push(
      new Defect({
        description: "Fenster defekt",
        personInCharge: "Bernd",
        doneTill: "1.11.111",
        images: imageList
      })
    );

    roomList.push(
      new Room({
        name: "Wohnzimmer",
        number: 1,
        description: "Links",
        defects: defectList
      })
    );

    livingUnitList.push(
      new LivingUnit({
        number: 1,
        rooms: roomList
      })
    );
  }
}
