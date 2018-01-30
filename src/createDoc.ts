import pino = require("pino");

import { Defect } from "./model/defect";
import { DefectList } from "./model/defectList";
import { Floor } from "./model/floor";
import { Image } from "./model/image";
import { LivingUnit } from "./model/livingUnit";
import { DocImage } from "./model/pdfmake/docImage";
import { DocMargin } from "./model/pdfmake/docMargin";
import { Room } from "./model/room";

export class CreateDoc {
  constructor(
    private readonly params: {
      readonly imageBasePath: string;
    }
  ) {}

  public execute(): object[] {
    const pretty = pino.pretty();

    pretty.pipe(process.stdout);

    const log = pino(
      {
        // name: "app",
        safe: true,
        timestamp: false
      },
      pretty
    );

    const defects: DefectList = this.createTestData();

    return this.createDoc({ defectList: defects });
  }

  private createDoc(params: { defectList: DefectList }): object[] {
    const defectList: DefectList = params.defectList;
    const docImageList: DocImage[] = [];
    const doc: object[] = [];

    for (const floor of defectList.floors) {
      for (const livingUnit of floor.livingUnits) {
        for (const room of livingUnit.rooms) {
          for (const defect of room.defects) {
            for (const image of defect.images) {
              doc.push(
                new DocImage({
                  margin: new DocMargin({
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                  }),
                  imageUrl: this.params.imageBasePath + image.name,
                  fit: [100, 100]
                }).docDefinition
              );
            }
          }
        }
      }
    }

    return doc;
  }

  private createTestData(): DefectList {
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

    floorList.push(
      new Floor({
        name: "EG",
        livingUnits: livingUnitList
      })
    );

    return new DefectList({
      date: "01.11.1111",
      creatorName: "Erni",
      streetName: "Staße",
      houseNumber: 1,
      additional: "a",
      floors: floorList
    });
  }
}
