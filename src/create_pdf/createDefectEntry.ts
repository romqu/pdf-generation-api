import { defaultDocMargin, defaultDocTableLayout } from "../constants";
import { createDefectTextTable } from "../create_pdf/createDefectTextTable";
import { Defect } from "../model/defect";
import { DocEntry } from "../model/pdfmake/docEntry";
import { DocImage } from "../model/pdfmake/docImage";
import { DocLine } from "../model/pdfmake/docLine";
import { DocMargin } from "../model/pdfmake/docMargin";
import { DocTable } from "../model/pdfmake/docTable";
import { DocTableBody } from "../model/pdfmake/docTableBody";
import { DocTableBodyRow } from "../model/pdfmake/docTableBodyRow";
import { DocText } from "../model/pdfmake/docText";

export function createDefectEntry(
  defect: Defect,
  imageBasePath: string,
  defectNumber: number
): DocEntry {
  const defectFirstImageTableBody: DocTableBody = new DocTableBody();
  const defectFirstImageTableRow: DocTableBodyRow = new DocTableBodyRow();

  const docEntry: DocEntry = new DocEntry();

  // Mangel 1
  docEntry.addDocModelList([
    new DocText({
      docMargin: new DocMargin(),
      text: `Mangel ${defectNumber}`
    }),
    new DocLine({
      x2: (595 - 2 * 40 - 27.5) / 2.5
    })
  ]);

  // 2 - Table textfield
  const defectTextTableEntry: DocEntry = createDefectTextTable(defect);

  // 3 - images
  for (let i = 0; i < defect.images.length; i++) {
    if (defect.images.length === 1) {
      defectFirstImageTableRow.addEntryList([
        new DocEntry({
          docModels: [
            new DocImage({
              margin: defaultDocMargin,
              imageUrl: imageBasePath + defect.images[i].name,
              fit: [200, 150]
            })
          ]
        }),
        new DocEntry({
          docModels: [
            new DocText({ text: "", docMargin: new DocMargin({ left: 5 }) })
          ]
        })
      ]);
    }

    if (i === 0) {
      defectFirstImageTableRow.addEntry(
        new DocEntry({
          docModels: [
            new DocImage({
              margin: defaultDocMargin,
              imageUrl: imageBasePath + defect.images[i].name,
              fit: [200, 150]
            })
          ]
        })
      );
    } else {
      defectFirstImageTableRow.addEntryList([
        new DocEntry({
          docModels: [
            new DocText({ text: "", docMargin: new DocMargin({ left: 5 }) })
          ]
        }),
        new DocEntry({
          docModels: [
            new DocImage({
              margin: defaultDocMargin,
              imageUrl: imageBasePath + defect.images[i].name,
              fit: [200, 150]
            })
          ]
        })
      ]);
    }
  }

  defectFirstImageTableRow.addEntry(defectTextTableEntry);
  defectFirstImageTableBody.addRow(defectFirstImageTableRow);

  docEntry.addDocModelList([
    new DocTable({
      widths: ["auto", "auto", "auto", "auto"],
      body: defectFirstImageTableBody,
      docLayout: defaultDocTableLayout
    })
  ]);

  return docEntry;
}
