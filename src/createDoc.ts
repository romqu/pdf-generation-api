import { createDefectEntry } from "./create_pdf/createDefectEntry";
import { createTestData } from "./create_pdf/createTestData";
import { DefectList } from "./model/defectList";
import { DocEntry } from "./model/pdfmake/docEntry";
import { DocLine } from "./model/pdfmake/docLine";
import { DocStack } from "./model/pdfmake/docStack";
import { DocText } from "./model/pdfmake/docText";

export class CreateDoc {
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
    const defectEntries: DocEntry[] = [];
    const roomEntry: DocEntry = new DocEntry();

    for (const room of params.defectList.floors[0].livingUnits[0].rooms) {
      roomEntry.addDocModelList([
        new DocStack({
          docEntryList: [
            new DocEntry({
              docModels: [
                new DocText({
                  text: room.name + " " + room.number
                }),
                new DocLine({
                  x2: (595 - 2 * 40 - 27.5) / 2
                }),
                new DocText({ text: room.description })
              ]
            })
          ]
        })
      ]);

      doc.push(roomEntry.docDefinition());

      for (let i = 0; i < room.defects.length; i++) {
        defectEntries.push(
          createDefectEntry(room.defects[i], this.params.imageBasePath, i + 1)
        );
      }
    }

    for (const defectEntry of defectEntries) {
      doc.push(defectEntry.docDefinition());
    }

    return doc;
  }
}
