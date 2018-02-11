import { defaultDocTableLayout } from "../constants";
import { logger } from "../logger";
import { DocEntry } from "../model/pdfmake/docEntry";
import { DocTable } from "../model/pdfmake/docTable";
import { DocTableBody } from "../model/pdfmake/docTableBody";
import { DocTableBodyRow } from "../model/pdfmake/docTableBodyRow";
import { DocText } from "../model/pdfmake/docText";

export function createHeader(): DocEntry {
  const headerLeft = new DocTable({
    widths: ["20%", "80%"],
    body: new DocTableBody({
      rows: [
        new DocTableBodyRow({
          entries: [
            new DocEntry({
              docModels: [new DocText({ text: "Projekt:" })]
            }),
            new DocEntry({
              docModels: [
                new DocText({
                  text: [
                    new DocText({ text: "Musterstraße 1," }),
                    new DocText({ text: "\nMusterland" })
                  ]
                })
              ]
            })
          ]
        })
      ]
    }),
    docLayout: defaultDocTableLayout
  });

  logger.info(headerLeft.docDefinition());

  return new DocEntry({ docModels: [headerLeft] });
}
