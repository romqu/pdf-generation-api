import { DocEntry } from "../model/pdfmake/docEntry";
import { DocMargin } from "../model/pdfmake/docMargin";
import { DocText } from "../model/pdfmake/docText";

export function createFooter(currentPage: number, pageCount: number): object {
  return new DocText({
    docMargin: new DocMargin({ top: 5 }),
    text: `Seite ${currentPage} von ${pageCount}`,
    fontSize: 9,
    alignment: "center"
  }).docDefinition();
}
