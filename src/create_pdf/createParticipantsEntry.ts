import { defaultDocTableLayout } from "../constants";
import { logger } from "../logger";
import { Participant } from "../model/participant";
import { DocEntry } from "../model/pdfmake/docEntry";
import { DocMargin } from "../model/pdfmake/docMargin";
import { DocTable } from "../model/pdfmake/docTable";
import { DocTableBody } from "../model/pdfmake/docTableBody";
import { DocTableBodyRow } from "../model/pdfmake/docTableBodyRow";
import { DocText } from "../model/pdfmake/docText";

export function createParticipantsEntry(
  participantList: Participant[]
): DocEntry {
  const rows: DocTableBodyRow[] = [];
  const row: DocTableBodyRow = new DocTableBodyRow();
  const tableBody: DocTableBody = new DocTableBody();
  const entries: DocEntry[] = [];

  for (let i = 0; i < participantList.length; i++) {
    entries.push(
      new DocEntry({
        docModels: [
          new DocTable({
            widths: ["auto", "*"],
            docMargin: new DocMargin({ left: 5, bottom: 5 }),
            body: new DocTableBody({
              rows: [
                new DocTableBodyRow({
                  entries: [
                    new DocEntry({
                      docModels: [
                        new DocText({
                          text: "Projekt:"
                        })
                      ]
                    }),
                    new DocEntry({
                      docModels: [
                        new DocText({
                          docMargin: new DocMargin({ left: 2 }),
                          text: "Musterstraße 1"
                        })
                      ]
                    })
                  ]
                }),
                new DocTableBodyRow({
                  entries: [
                    new DocEntry({
                      docModels: [
                        new DocText({
                          text: "Projekt:"
                        })
                      ]
                    }),
                    new DocEntry({
                      docModels: [
                        new DocText({
                          docMargin: new DocMargin({ left: 2 }),
                          text: "Musterstraße 1"
                        })
                      ]
                    })
                  ]
                }),
                new DocTableBodyRow({
                  entries: [
                    new DocEntry({
                      docModels: [
                        new DocText({
                          text: "Projekt:"
                        })
                      ]
                    }),
                    new DocEntry({
                      docModels: [
                        new DocText({
                          docMargin: new DocMargin({ left: 2 }),
                          text: "Musterstraße 1"
                        })
                      ]
                    })
                  ]
                }),
                new DocTableBodyRow({
                  entries: [
                    new DocEntry({
                      docModels: [
                        new DocText({
                          text: "Projekt:"
                        })
                      ]
                    }),
                    new DocEntry({
                      docModels: [
                        new DocText({
                          docMargin: new DocMargin({ left: 2 }),
                          text: "Musterstraße 1"
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            docLayout: defaultDocTableLayout
          })
        ]
      })
    );
  }

  for (let i = 0; i < entries.length; i = i + 4) {
    const ent = entries.slice(
      i,
      i + 4 <= entries.length ? i + 4 : entries.length - 1
    );

    if (ent.length < 4) {
      for (let j = 0; j < 4 - ent.length; j++) {}
    }

    rows.push(
      new DocTableBodyRow({
        entries: entries.slice(
          i,
          i + 4 <= entries.length ? i + 4 : entries.length - 1
        )
      })
    );
  }

  tableBody.addRows(rows);

  logger.info(rows.length.toString());

  return new DocEntry({
    docModels: [
      new DocTable({
        docMargin: new DocMargin({ top: 10 }),
        body: tableBody,
        docLayout: defaultDocTableLayout
      })
    ]
  });
}
