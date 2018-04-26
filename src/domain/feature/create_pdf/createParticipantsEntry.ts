import { defaultDocTableLayout } from "../../../constants";
import { ViewParticipant } from "../../model/document/viewParticipant";
import { DocEntry } from "../../model/pdfmake/docEntry";
import { DocLine } from "../../model/pdfmake/docLine";
import { DocMargin } from "../../model/pdfmake/docMargin";
import { DocTable } from "../../model/pdfmake/docTable";
import { DocTableBody } from "../../model/pdfmake/docTableBody";
import { DocTableBodyRow } from "../../model/pdfmake/docTableBodyRow";
import { DocText } from "../../model/pdfmake/docText";

export function createParticipantsEntry(
  participantList: ViewParticipant[]
): DocEntry {
  const rows: DocTableBodyRow[] = [];
  const row: DocTableBodyRow = new DocTableBodyRow();
  const tableBody: DocTableBody = new DocTableBody();
  const entries: DocEntry[] = [];

  const headline = new DocEntry({
    docModels: [
      new DocText({ text: "Begehungsteilnehmer" }),
      new DocLine({
        x2: (595 - 2 * 40 - 27.5) / 2,
        docMargin: new DocMargin({ left: 0, top: 2 })
      })
    ]
  });
  const line = new DocLine({
    x2: (595 - 2 * 40 - 27.5) / 2,
    docMargin: new DocMargin({ left: 0, top: 2 })
  });

  for (const participant of participantList) {
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
                          docMargin: new DocMargin({ top: 2 }),
                          text: "Name: ",
                          isBold: true
                        })
                      ]
                    }),
                    new DocEntry({
                      docModels: [
                        new DocText({
                          docMargin: new DocMargin({ left: 3, top: 2 }),
                          text: `${participant.forename} ${participant.surname}`
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
                          docMargin: new DocMargin({ top: 2 }),
                          text: "Firma: ",
                          isBold: true
                        })
                      ]
                    }),
                    new DocEntry({
                      docModels: [
                        new DocText({
                          docMargin: new DocMargin({ left: 3, top: 2 }),
                          text: participant.companyName
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
                          docMargin: new DocMargin({ top: 2 }),
                          text: "E-Mail: ",
                          isBold: true
                        })
                      ]
                    }),
                    new DocEntry({
                      docModels: [
                        new DocText({
                          docMargin: new DocMargin({ left: 3, top: 2 }),
                          text: participant.email
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
                          docMargin: new DocMargin({ top: 2 }),
                          text: "Telefon: ",
                          isBold: true
                        })
                      ]
                    }),
                    new DocEntry({
                      docModels: [
                        new DocText({
                          docMargin: new DocMargin({ left: 3, top: 2 }),
                          text: participant.phoneNumber.toString()
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
      headline,
      new DocTable({
        body: tableBody,
        docLayout: defaultDocTableLayout
      }),
      line
    ]
  });
}
