import { defaultDocTableLayout } from "../constants";
import { DocEntry } from "../model/pdfmake/docEntry";
import { DocImage } from "../model/pdfmake/docImage";
import { DocMargin } from "../model/pdfmake/docMargin";
import { DocTable } from "../model/pdfmake/docTable";
import { DocTableBody } from "../model/pdfmake/docTableBody";
import { DocTableBodyRow } from "../model/pdfmake/docTableBodyRow";
import { DocText } from "../model/pdfmake/docText";

export function createHeader(): () => object[] {
  const headerLeft = new DocTable({
    widths: ["20%", "80%"],
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
    docMargin: new DocMargin({ left: 40, top: 20, right: 40, bottom: 0 }),
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

  return (): object[] => new DocEntry({ docModels: [header] }).docDefinition();
}
