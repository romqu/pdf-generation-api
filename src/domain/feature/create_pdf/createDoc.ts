import { DefectList } from "../../model/document/defectList";
import { DocEntry } from "../../model/pdfmake/docEntry";
import { createDefectEntry } from "./createDefectEntry";
import { createFloorAndLivingUnitEntry } from "./createFloorAndLivingUnitEntry";
import { createParticipantsEntry } from "./createParticipantsEntry";
import { createRoomEntry } from "./createRoomEntry";
import { createTestData } from "./createTestData";

export class CreateDoc {
  constructor(
    private readonly params: {
      readonly imageBasePath: string;
    }
  ) {}

  public execute(/* defectList */ _: DefectList): DocEntry {
    const defects: DefectList = createTestData();
    return this.createDoc({ defectList: defects });
  }

  private createDoc(params: { defectList: DefectList }): DocEntry {
    const docEntry: DocEntry = new DocEntry();

    docEntry.addDocModel(
      createParticipantsEntry(
        params.defectList.streetAddress.viewParticipantList
      )
    );

    for (const floor of params.defectList.streetAddress.floorList) {
      for (const livingUnit of floor.livingUnitList) {
        const livingUnitEntry: DocEntry = createFloorAndLivingUnitEntry(
          floor,
          livingUnit
        );

        docEntry.addDocModel(livingUnitEntry);

        for (const room of livingUnit.roomList) {
          const roomEntry: DocEntry = createRoomEntry(room);
          const defectEntries: DocEntry[] = [];

          docEntry.addDocModel(roomEntry);

          for (let i = 0; i < room.defectList.length; i++) {
            defectEntries.push(
              createDefectEntry(
                room.defectList[i],
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
