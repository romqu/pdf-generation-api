import { defaultDocTableLayout } from "../constants";
import { Participant } from "../model/participant";
import { DocEntry } from "../model/pdfmake/docEntry";
import { DocMargin } from "../model/pdfmake/docMargin";
import { DocTable } from "../model/pdfmake/docTable";
import { DocTableBody } from "../model/pdfmake/docTableBody";
import { DocTableBodyRow } from "../model/pdfmake/docTableBodyRow";
import { DocText } from "../model/pdfmake/docText";
import { DocLine } from "../model/pdfmake/docLine";

export function createParticipantsEntry(
  participantList: Participant[]
): DocEntry {
  const rows: DocTableBodyRow[] = [];
  const row: DocTableBodyRow = new DocTableBodyRow();
  const tableBody: DocTableBody = new DocTableBody();
  const entries: DocEntry[] = [];

  const a = new DocEntry({
    docModels: [
      new DocText({ text: "Begehungsteilnehmer" }),
      new DocLine({
        x2: 200,
        docMargin: new DocMargin({ left: 0, top: 2 })
      })
    ]
  });

  for (let i = 0; i < participantList.length; i++) {
    entries.push(
      new DocEntry({
        docModels: [
          new DocTable({
            widths: ["auto", "*"],
            docMargin: new DocMargin({ bottom: 5, top: 5 }),
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
      for (let j = 0; j < 6 - ent.length; j++) {
        ent.push(new DocEntry());
      }
    }

    rows.push(
      new DocTableBodyRow({
        entries: ent
      })
    );
  }

  tableBody.addRows(rows);

  return new DocEntry({
    docModels: [
      a,
      new DocTable({
        body: tableBody,
        docLayout: defaultDocTableLayout
      })
    ]
  });
}
