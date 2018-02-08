import { defaultDocTableLayout } from "./constants";
import { createDefectTextTable } from "./create_pdf/createDefectTextTable";
import { createTestData } from "./create_pdf/createTestData";
import { Defect } from "./model/defect";
import { DefectList } from "./model/defectList";
import { DocEntry } from "./model/pdfmake/docEntry";
import { DocImage } from "./model/pdfmake/docImage";
import { DocLine } from "./model/pdfmake/docLine";
import { DocMargin } from "./model/pdfmake/docMargin";
import { DocTable } from "./model/pdfmake/docTable";
import { DocTableBody } from "./model/pdfmake/docTableBody";
import { DocTableBodyRow } from "./model/pdfmake/docTableBodyRow";
import { DocTableLayout } from "./model/pdfmake/docTableLayout";
import { DocText } from "./model/pdfmake/docText";

export class CreateDoc {
  private readonly defaultDocMargin: DocMargin = new DocMargin({
    left: 2,
    top: 2,
    right: 2,
    bottom: 2
  });

  private readonly docTableLayout: DocTableLayout = defaultDocTableLayout;

  constructor(
    private readonly params: {
      readonly imageBasePath: string;
    }
  ) {}

  public execute(): object[] {
    const defects: DefectList = createTestData();

    return this.createDoc({ defectList: defects });
  }

  private createDoc(params: { defectList: DefectList }): object[] {
    const doc: object[] = [];
    const defectTables: DocTable[] = [];

    for (const room of params.defectList.floors[0].livingUnits[0].rooms) {
      doc.push(
        new DocText({ text: room.name + " " + room.number }).docDefinition(),
        new DocLine({
          x2: (595 - 2 * 40 - 27.5) / 2
        }).docDefinition(),
        new DocText({ text: room.description }).docDefinition
      );

      for (const defect of room.defects) {
        defectTables.push(this.createDefectTable(defect));
      }
    }

    for (const defectTable of defectTables) {
      doc.push(defectTable.docDefinition());
    }

    return doc;
  }

  private createDefectTable(defect: Defect): DocTable {
    const defectFirstImageTableBody: DocTableBody = new DocTableBody();
    const defectFirstImageTableRow: DocTableBodyRow = new DocTableBodyRow();

    const defectSecondImageTableBody: DocTableBody = new DocTableBody();
    const defectSecondImageRow: DocTableBodyRow = new DocTableBodyRow();

    const docEntry: DocEntry = new DocEntry();

    docEntry.addDocModelList([
      new DocText({
        docMargin: new DocMargin(),
        text: "Mangel 1"
      }),
      new DocLine({
        x2: (595 - 2 * 40 - 27.5) / 2.5
      })
    ]);

    // 2 - Table textfield
    const defectTextTableEntry: DocEntry = createDefectTextTable(defect);

    // 3 - images
    for (let i = 0; i < defect.images.length; i++) {
      if (i === 0) {
        defectFirstImageTableRow.addEntry(
          new DocEntry({
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
          new DocEntry({
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

    defectFirstImageTableRow.addEntry(defectTextTableEntry);

    defectFirstImageTableBody.addRow(defectFirstImageTableRow);
    defectSecondImageTableBody.addRow(defectSecondImageRow);

    return new DocTable({
      body: new DocTableBody({
        rows: [
          new DocTableBodyRow({
            entries: [
              new DocEntry({
                docModels: [
                  new DocText({
                    docMargin: new DocMargin(),
                    text: "Mangel 1"
                  }),
                  new DocLine({
                    x2: (595 - 2 * 40 - 27.5) / 2.5
                  }),
                  new DocTable({
                    body: defectFirstImageTableBody,
                    docLayout: this.docTableLayout
                  }),
                  new DocTable({
                    body: defectSecondImageTableBody,
                    docLayout: this.docTableLayout
                  })
                ]
              })
            ]
          })
        ]
      }),
      docLayout: this.docTableLayout
    });
  }
}
