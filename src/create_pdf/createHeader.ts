import { defaultDocTableLayout } from "../constants";
import { DocEntry } from "../model/pdfmake/docEntry";
import { DocImage } from "../model/pdfmake/docImage";
import { DocLine } from "../model/pdfmake/docLine";
import { DocMargin } from "../model/pdfmake/docMargin";
import { DocTable } from "../model/pdfmake/docTable";
import { DocTableBody } from "../model/pdfmake/docTableBody";
import { DocTableBodyRow } from "../model/pdfmake/docTableBodyRow";
import { DocText } from "../model/pdfmake/docText";

export const createHeader = (): object[] => {
  const headerLeft = new DocTable({
    widths: ["auto", "auto"],
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

  const header = new DocTable({
    docMargin: new DocMargin({ left: 7.5, top: 7.5, right: 7.5, bottom: 0 }),
    widths: ["40%", "20%", "40%"],
    body: new DocTableBody({
      rows: [
        new DocTableBodyRow({
          entries: [
            new DocEntry({
              docModels: [headerLeft]
            }),
            new DocEntry({
              docModels: [
                new DocImage({
                  imageUrl:
                    "/home/roman/git-projects/immo-pdf-generation/rest-api/assets/images/creavisio.jpg",
                  alignment: "center",
                  fit: [100, 70]
                })
              ]
            }),
            new DocEntry({
              docModels: [
                new DocText({
                  text: [
                    new DocText({
                      text: "Datum: 1.1.1111",
                      alignment: "right"
                    })
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

  const line: DocLine = new DocLine({
    x2: 595 - 2 * 7.5,
    docMargin: new DocMargin({ left: 7.5, top: 7.5 })
  });

  return new DocEntry({ docModels: [header, line] }).docDefinition();
};
