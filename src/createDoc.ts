import { createDefectEntry } from "./create_pdf/createDefectEntry";
import { createFloorAndLivingUnitEntry } from "./create_pdf/createFloorAndLivingUnitEntry";
import { createRoomEntry } from "./create_pdf/createRoomEntry";
import { createTestData } from "./create_pdf/createTestData";
import { DefectList } from "./model/defectList";
import { DocEntry } from "./model/pdfmake/docEntry";

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

    for (const floor of params.defectList.floors) {
      for (const livingUnit of floor.livingUnits) {
        const livingUnitEntry: DocEntry = createFloorAndLivingUnitEntry(
          floor,
          livingUnit
        );
        doc.push(livingUnitEntry.docDefinition());
        for (const room of livingUnit.rooms) {
          const roomEntry: DocEntry = createRoomEntry(room);
          const defectEntries: DocEntry[] = [];

          doc.push(roomEntry.docDefinition());

          for (let i = 0; i < room.defects.length; i++) {
            defectEntries.push(
              createDefectEntry(
                room.defects[i],
                this.params.imageBasePath,
                i + 1
              )
            );
          }

          for (const defectEntry of defectEntries) {
            doc.push(defectEntry.docDefinition());
          }
        }
      }
    }

    return doc;
  }
}
