import { Defect } from "../model/defect";
import { DefectList } from "../model/defectList";
import { Floor } from "../model/floor";
import { Image } from "../model/image";
import { LivingUnit } from "../model/livingUnit";
import { Room } from "../model/room";

export function createTestData(): DefectList {
  const imageList: Image[] = [];
  const defectList: Defect[] = [];
  const roomList: Room[] = [];
  const livingUnitList: LivingUnit[] = [];
  const floorList: Floor[] = [];

  for (let i = 0; i < 3; i++) {
    imageList.push(new Image({ name: "mangel-border.jpg" }));
  }

  for (let i = 0; i < 2; i++) {
    defectList.push(
      new Defect({
        description: "Fenster defekt",
        personInCharge: "Bernd",
        doneTill: "1.11.111",
        images: imageList
      })
    );
  }

  for (let i = 0; i < 2; i++) {
    roomList.push(
      new Room({
        name: "Wohnzimmer",
        number: i,
        description: "Links",
        defects: defectList
      })
    );
  }

  for (let i = 0; i < 2; i++) {
    livingUnitList.push(
      new LivingUnit({
        number: i,
        rooms: roomList
      })
    );
  }

  for (let i = 0; i < 2; i++) {
    floorList.push(
      new Floor({
        name: "EG",
        livingUnits: livingUnitList
      })
    );
  }

  return new DefectList({
    date: "01.11.1111",
    creatorName: "Erni",
    streetName: "Staße",
    houseNumber: 1,
    additional: "a",
    floors: floorList
  });
}
