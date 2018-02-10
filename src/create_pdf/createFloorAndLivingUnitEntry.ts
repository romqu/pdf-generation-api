import { Floor } from "../model/floor";
import { LivingUnit } from "../model/livingUnit";
import { DocEntry } from "../model/pdfmake/docEntry";
import { DocLine } from "../model/pdfmake/docLine";
import { DocStack } from "../model/pdfmake/docStack";
import { DocText } from "../model/pdfmake/docText";

export function createFloorAndLivingUnitEntry(
  floor: Floor,
  livingUnit: LivingUnit
): DocEntry {
  return new DocEntry({
    docModels: [
      new DocStack({
        docEntryList: [
          new DocEntry({
            docModels: [
              new DocText({
                text: `${floor.name} | WG - ${livingUnit.number + 1}`
              }),
              new DocLine({
                x2: (595 - 2 * 40 - 27.5) / 2
              })
            ]
          })
        ]
      })
    ]
  });
}
