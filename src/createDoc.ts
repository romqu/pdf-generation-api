import { createDefectEntry } from "./create_pdf/createDefectEntry";
import { createFloorAndLivingUnitEntry } from "./create_pdf/createFloorAndLivingUnitEntry";
import { createParticipantsEntry } from "./create_pdf/createParticipantsEntry";
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

  public execute(): DocEntry {
    const defects: DefectList = createTestData();
    return this.createDoc({ defectList: defects });
  }

  private createDoc(params: { defectList: DefectList }): DocEntry {
    const docEntry: DocEntry = new DocEntry();

    for (const floor of params.defectList.floors) {
      for (const livingUnit of floor.livingUnits) {
        const livingUnitEntry: DocEntry = createFloorAndLivingUnitEntry(
          floor,
          livingUnit
        );

        docEntry.addDocModel(livingUnitEntry);

        for (const room of livingUnit.rooms) {
          const roomEntry: DocEntry = createRoomEntry(room);
          const defectEntries: DocEntry[] = [];

          docEntry.addDocModel(roomEntry);

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
            docEntry.addDocModel(defectEntry);
          }
        }
      }
    }

    return docEntry;
  }
}
