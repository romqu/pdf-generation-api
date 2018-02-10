import { DocEntry } from "../model/pdfmake/docEntry";
export function createHeader(): DocEntry {
  return new DocEntry({ docModels: [] });
}
