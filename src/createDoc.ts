import pino = require("pino");

import { Defect } from "./model/defect";
import { DefectList } from "./model/defectList";
import { Floor } from "./model/floor";
import { Image } from "./model/image";
import { LivingUnit } from "./model/livingUnit";
import { DocImage } from "./model/pdfmake/docImage";
import { DocMargin } from "./model/pdfmake/docMargin";
import { DocTable } from "./model/pdfmake/docTable";
import { DocTableLayout } from "./model/pdfmake/docTableLayout";
import { DocText } from "./model/pdfmake/docText";
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
    const defaultDocMargin: DocMargin = new DocMargin({
      left: 2,
      top: 2,
      right: 2,
      bottom: 2
    });

    const docTableLayout: DocTableLayout = new DocTableLayout({
      hLineWidth: (i: number, node: object): number => {
        return 0.1;
      },
      vLineWidth: (i: number, node: object): number => {
        return 0.1;
      },
      hLineColor: (i: number, node: object): string => {
        return "black";
      },
      vLineColor: (i: number, node: object): string => {
        return "black";
      },
      paddingLeft: (i: number, node: object): number => {
        return 0;
      },
      paddingRight: (i: number, node: object): number => {
        return 0;
      },
      paddingTop: (i: number, node: object): number => {
        return 0;
      },
      paddingBottom: (i: number, node: object): number => {
        return 0;
      }
    });

    const defectList: DefectList = params.defectList;

    const doc: object[] = [];

    for (const floor of defectList.floors) {
      for (const livingUnit of floor.livingUnits) {
        for (const room of livingUnit.rooms) {
          for (const defect of room.defects) {
            const docTableText: DocTable = new DocTable({
              docMargin: defaultDocMargin,
              widths: ["50%", "50%"],
              body: [
                new DocText({
                  docMargin: defaultDocMargin,
                  text: "A",
                  fontSize: 10,
                  isBold: false
                }).docDefinition,
                new DocText({
                  docMargin: defaultDocMargin,
                  text: "A",
                  fontSize: 10,
                  isBold: false
                }).docDefinition
              ],
              docLayout: docTableLayout
            });

            for (let i = 0; i < defect.images.length; i++) {
              if (i === 0) {
                const table: DocTable = new DocTable({
                  docMargin: defaultDocMargin,
                  widths: ["50%", "50%"],
                  body: [
                    new DocImage({
                      margin: defaultDocMargin,
                      imageUrl:
                        this.params.imageBasePath + defect.images[i].name,
                      fit: [200, 200]
                    }).docDefinition,
                    docTableText.docDefinition
                  ],
                  docLayout: docTableLayout
                });

                doc.push(table.docDefinition);
              } else if (i === defect.images.length - 1) {
                //
              }
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
