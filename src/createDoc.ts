import { Defect } from "./model/defect";
import { DefectList } from "./model/defectList";
import { Floor } from "./model/floor";
import { Image } from "./model/image";
import { LivingUnit } from "./model/livingUnit";
import { DocMargin } from "./model/pdfmake/docMargin";
import { DocTable } from "./model/pdfmake/docTable";
import { DocTableBody } from "./model/pdfmake/docTableBody";
import { DocTableBodyRow } from "./model/pdfmake/docTableBodyRow";
import { DocTableLayout } from "./model/pdfmake/docTableLayout";
import { DocText } from "./model/pdfmake/docText";
import { Room } from "./model/room";

export class CreateDoc {
  private readonly defaultDocMargin: DocMargin = new DocMargin({
    left: 2,
    top: 2,
    right: 2,
    bottom: 2
  });

  private readonly docTableLayout: DocTableLayout = new DocTableLayout({
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
  constructor(
    private readonly params: {
      readonly imageBasePath: string;
    }
  ) {}

  public execute(): object[] {
    const defects: DefectList = this.createTestData();

    return this.createDoc({ defectList: defects });
  }

  private createDoc(params: { defectList: DefectList }): object[] {
    const doc: object[] = [];
    // let docTableBodyImage: DocTableBody = new DocTableBody({ body: [] });
    // let docTableBodyDefect: DocTableBody = new DocTableBody({ body: [] });

    for (const defect of params.defectList.floors[0].livingUnits[0].rooms[0]
      .defects) {
      // 2 - Table textfield
      const docTableText: object[] = this.createDocTableText({
        defectP: defect
      });

      // 1 - Defect Headline with seperate line
      /*docTableBodyDefect = docTableBodyDefect.append({
        body: [
          new DocText({
            docMargin: this.defaultDocMargin,
            text: "Mangel 1"
          }).docDefinition,
          new DocLine({
            x1: 0,
            y1: 0,
            x2: (595 - 2 * 40 - 27.5) / 2.5,
            y2: 0,
            lineWidth: 0.5,
            docMargin: new DocMargin({ left: 20, top: 1 })
          }).docDefinition
        ]
      });

      

      // 3 - images
      for (let i = 0; i < defect.images.length; i++) {
        if (i === 0) {
          const table: DocTable = new DocTable({
            docMargin: this.defaultDocMargin,
            widths: ["50%", "50%"],
            body: [
              new DocImage({
                margin: this.defaultDocMargin,
                imageUrl: this.params.imageBasePath + defect.images[i].name,
                fit: [200, 200]
              }).docDefinition,
              docTableText
            ],
            docLayout: this.docTableLayout
          });

          doc.push(table.docDefinition);
        } else {
          docTableBodyImage = docTableBodyImage.append({
            body: new DocImage({
              margin: this.defaultDocMargin,
              imageUrl: this.params.imageBasePath + defect.images[i].name,
              fit: [200, 200]
            }).docDefinition
          });
        }
      }*/

      doc.push(docTableText);
    }

    return doc;
  }

  // TODO - Automate it...
  private createDocTableText(params: { defectP: Defect }): object[] {
    const docTableText: object[] = [];

    docTableText.push(
      new DocTable({
        docMargin: new DocMargin(),
        widths: "*",
        body: new DocTableBody({
          numberOfColumns: 2,
          numberOfRows: 1,
          rows: [
            new DocTableBodyRow({
              docModels: [
                new DocText({
                  docMargin: new DocMargin(),
                  text: "Beschreibung:",
                  fontSize: 10,
                  isBold: false
                }),
                new DocText({
                  docMargin: new DocMargin(),
                  text: "Beschreibung:",
                  fontSize: 10,
                  isBold: false
                })
              ]
            })
          ]
        }),
        docLayout: this.docTableLayout
      }).docDefinition()
    );

    docTableText.push(
      new DocTable({
        docMargin: new DocMargin(),
        widths: "*",
        body: new DocTableBody({
          numberOfColumns: 2,
          numberOfRows: 1,
          rows: [
            new DocTableBodyRow({
              docModels: [
                new DocText({
                  docMargin: new DocMargin(),
                  text: "Beschreibung:",
                  fontSize: 10,
                  isBold: false
                }),
                new DocText({
                  docMargin: new DocMargin(),
                  text: "Beschreibung:",
                  fontSize: 10,
                  isBold: false
                })
              ]
            })
          ]
        }),
        docLayout: this.docTableLayout
      }).docDefinition()
    );

    docTableText.push(
      new DocTable({
        docMargin: new DocMargin(),
        widths: "*",
        body: new DocTableBody({
          numberOfColumns: 2,
          numberOfRows: 1,
          rows: [
            new DocTableBodyRow({
              docModels: [
                new DocText({
                  docMargin: new DocMargin(),
                  text: "Beschreibung:",
                  fontSize: 10,
                  isBold: false
                }),
                new DocText({
                  docMargin: new DocMargin(),
                  text: "Beschreibung:",
                  fontSize: 10,
                  isBold: false
                })
              ]
            })
          ]
        }),
        docLayout: this.docTableLayout
      }).docDefinition()
    );

    return docTableText;
  }

  // Test data
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
