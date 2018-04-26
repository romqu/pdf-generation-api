import { Room } from "../../model/document/room";
import { DocEntry } from "../../model/pdfmake/docEntry";
import { DocLine } from "../../model/pdfmake/docLine";
import { DocMargin } from "../../model/pdfmake/docMargin";
import { DocStack } from "../../model/pdfmake/docStack";
import { DocText } from "../../model/pdfmake/docText";

export function createRoomEntry(room: Room): DocEntry {
  return new DocEntry({
    docModels: [
      new DocStack({
        docEntryList: [
          new DocEntry({
            docModels: [
              new DocText({
                text: `${room.name} ${room.number + 1}`,
                docMargin: new DocMargin({ top: 5 })
              }),
              new DocLine({
                x2: (595 - 2 * 40 - 27.5) / 2,
                docMargin: new DocMargin({ top: 1 })
              }),
              new DocText({
                text: room.locationDescription,
                docMargin: new DocMargin({ top: 5 })
              })
            ]
          })
        ]
      })
    ]
  });
}
