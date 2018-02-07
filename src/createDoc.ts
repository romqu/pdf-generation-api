import { Defect } from "./model/defect";
import { DefectList } from "./model/defectList";
import { Floor } from "./model/floor";
import { Image } from "./model/image";
import { LivingUnit } from "./model/livingUnit";
import { DocImage } from "./model/pdfmake/docImage";
import { DocMargin } from "./model/pdfmake/docMargin";
import { DocTable } from "./model/pdfmake/docTable";
import { DocTableBody } from "./model/pdfmake/docTableBody";
import { DocTableBodyRow } from "./model/pdfmake/docTableBodyRow";
import { DocTableBodyRowEntry } from "./model/pdfmake/docTableBodyRowEntry";
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

    const defectFirstImageTableBody: DocTableBody = new DocTableBody();
    const defectFirstImageTableRow: DocTableBodyRow = new DocTableBodyRow();

    const defectSecondImageTableBody: DocTableBody = new DocTableBody();
    const defectSecondImageRow: DocTableBodyRow = new DocTableBodyRow();

    for (const defect of params.defectList.floors[0].livingUnits[0].rooms[0]
      .defects) {
      // 2 - Table textfield
      const defectTextTableRowEntry: DocTableBodyRowEntry = this.createDefectTextTables(
        {
          defectP: defect
        }
      );

      // 3 - images
      for (let i = 0; i < defect.images.length; i++) {
        if (i === 0) {
          defectFirstImageTableRow.addEntry(
            new DocTableBodyRowEntry({
              docModels: [
                new DocImage({
                  margin: this.defaultDocMargin,
                  imageUrl: this.params.imageBasePath + defect.images[i].name,
                  fit: [230, 200]
                })
              ]
            })
          );
        } else {
          defectSecondImageRow.addEntry(
            new DocTableBodyRowEntry({
              docModels: [
                new DocImage({
                  margin: this.defaultDocMargin,
                  imageUrl: this.params.imageBasePath + defect.images[i].name,
                  fit: [230, 200]
                })
              ]
            })
          );
        }
      }

      defectFirstImageTableRow.addEntry(defectTextTableRowEntry);

      defectFirstImageTableBody.addRow(defectFirstImageTableRow);
      defectSecondImageTableBody.addRow(defectSecondImageRow);
    }

    doc.push(
      new DocTable({
        body: defectFirstImageTableBody,
        docLayout: this.docTableLayout
      }).docDefinition(),
      new DocTable({
        body: defectSecondImageTableBody,
        docLayout: this.docTableLayout
      }).docDefinition()
    );

    return doc;
  }

  // TODO - Automate it...
  private createDefectTextTables(params: {
    defectP: Defect;
  }): DocTableBodyRowEntry {
    const docTableList: DocTable[] = [];

    const entry: DocTableBodyRowEntry = new DocTableBodyRowEntry();

    docTableList.push(
      new DocTable({
        body: new DocTableBody({
          rows: [
            new DocTableBodyRow({
              entries: [
                new DocTableBodyRowEntry({
                  docModels: [
                    new DocText({
                      docMargin: new DocMargin(),
                      text: "Beschreibung:"
                    })
                  ]
                }),
                new DocTableBodyRowEntry({
                  docModels: [
                    new DocText({
                      docMargin: new DocMargin(),
                      text: "Beschreibung:"
                    })
                  ]
                })
              ]
            })
          ]
        }),
        docLayout: this.docTableLayout
      })
    );

    docTableList.push(
      new DocTable({
        body: new DocTableBody({
          rows: [
            new DocTableBodyRow({
              entries: [
                new DocTableBodyRowEntry({
                  docModels: [
                    new DocText({
                      docMargin: new DocMargin(),
                      text: "Beschreibung:"
                    })
                  ]
                }),
                new DocTableBodyRowEntry({
                  docModels: [
                    new DocText({
                      docMargin: new DocMargin(),
                      text: "Beschreibung:"
                    })
                  ]
                })
              ]
            })
          ]
        }),
        docLayout: this.docTableLayout
      })
    );

    docTableList.push(
      new DocTable({
        body: new DocTableBody({
          rows: [
            new DocTableBodyRow({
              entries: [
                new DocTableBodyRowEntry({
                  docModels: [
                    new DocText({
                      docMargin: new DocMargin(),
                      text: "Beschreibung:"
                    })
                  ]
                }),
                new DocTableBodyRowEntry({
                  docModels: [
                    new DocText({
                      docMargin: new DocMargin(),
                      text: "Beschreibung:"
                    })
                  ]
                })
              ]
            })
          ]
        }),
        docLayout: this.docTableLayout
      })
    );

    entry.addDocModelList(docTableList);

    return entry;
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
