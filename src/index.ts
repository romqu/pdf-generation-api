import fs = require("fs");
import PdfPrinter = require("pdfmake");

import { defaultDocTableLayout } from "./constants";
import { createFooter } from "./create_pdf/createFooter";
import { createHeader } from "./create_pdf/createHeader";
import { createParticipantsEntry } from "./create_pdf/createParticipantsEntry";
import { createTestData } from "./create_pdf/createTestData";
import { CreateDoc } from "./createDoc";
import { Doc } from "./model/pdfmake/doc";
import { DocEntry } from "./model/pdfmake/docEntry";
import { DocImage } from "./model/pdfmake/docImage";
import { DocLine } from "./model/pdfmake/docLine";
import { DocMargin } from "./model/pdfmake/docMargin";
import { DocTable } from "./model/pdfmake/docTable";
import { DocTableBody } from "./model/pdfmake/docTableBody";
import { DocTableBodyRow } from "./model/pdfmake/docTableBodyRow";
import { DocText } from "./model/pdfmake/docText";

const fonts = {
  Roboto: {
    normal: "./assets/fonts/Roboto-Regular.ttf",
    bold: "./assets/fonts/Roboto-Medium.ttf",
    italics: "./assets/fonts/Roboto-Italic.ttf",
    bolditalics: "./assets/fonts/Roboto-MediumItalic.ttf"
  }
};

const lorem =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

const createDoc: CreateDoc = new CreateDoc({
  imageBasePath: "./assets/images/"
});

const pdfPrinter = new PdfPrinter(fonts);

const table = new DocTable({
  widths: ["auto", "auto", "auto", "auto"],
  body: new DocTableBody({
    rows: [
      new DocTableBodyRow({
        entries: [
          new DocEntry({
            docModels: [
              new DocImage({
                imageUrl:
                  "/home/roman/git-projects/immo-pdf-generation/rest-api/assets/images/mangel-border.jpg",
                fit: [200, 135]
              })
            ]
          }),
          new DocEntry({
            docModels: [
              new DocText({ text: "", docMargin: new DocMargin({ left: 5 }) })
            ]
          }),
          new DocEntry({
            docModels: [
              new DocImage({
                imageUrl:
                  "/home/roman/git-projects/immo-pdf-generation/rest-api/assets/images/mangel-border.jpg",
                fit: [200, 135]
              })
            ]
          }),
          new DocEntry({
            docModels: [
              new DocTable({
                docMargin: new DocMargin({ left: 5 }),
                body: new DocTableBody({
                  rows: [
                    new DocTableBodyRow({
                      entries: [
                        new DocEntry({
                          docModels: [
                            new DocText({
                              docMargin: new DocMargin(),
                              text: [
                                new DocText({
                                  docMargin: new DocMargin(),
                                  text: "Beschreibung:\n",
                                  isBold: true
                                }),
                                new DocText({
                                  docMargin: new DocMargin({ top: 5 }),
                                  text: "Text\n\n"
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
              }),
              new DocTable({
                docMargin: new DocMargin({ left: 5 }),
                body: new DocTableBody({
                  rows: [
                    new DocTableBodyRow({
                      entries: [
                        new DocEntry({
                          docModels: [
                            new DocText({
                              docMargin: new DocMargin(),
                              text: [
                                new DocText({
                                  docMargin: new DocMargin(),
                                  text: "Verantwortlicher:\n",
                                  isBold: true
                                }),
                                new DocText({
                                  docMargin: new DocMargin(),
                                  text: "Text\n\n"
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
              }),
              new DocTable({
                docMargin: new DocMargin({ left: 5 }),
                body: new DocTableBody({
                  rows: [
                    new DocTableBodyRow({
                      entries: [
                        new DocEntry({
                          docModels: [
                            new DocText({
                              docMargin: new DocMargin(),
                              text: [
                                new DocText({
                                  text: "Erledigt bis:\n",
                                  isBold: true
                                }),
                                new DocText({
                                  docMargin: new DocMargin(),
                                  text: "Text"
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
              })
            ]
          })
        ]
      })
    ]
  }),
  docLayout: defaultDocTableLayout
});

const docc = {
  header: createHeader,
  footer: createFooter,
  pageMargins: new DocMargin({
    left: 7.5,
    right: 7.5,
    top: 60,
    bottom: 25
  }).docDefinition(),
  content: [
    new DocText({
      text: "EG | WE-01",
      docMargin: new DocMargin({ bottom: 3 }),
      isBold: true
    }).docDefinition(),
    new DocLine({
      x2: (595 - 2 * 40 - 27.5) / 2.5,
      docMargin: new DocMargin({ bottom: 5 })
    }).docDefinition(),
    new DocText({
      text: "Wohnzimmer 1",
      docMargin: new DocMargin({ bottom: 3, top: 3 }),
      isBold: true
    }).docDefinition(),
    new DocText({
      text: "Hier steht geschrieben, wo der Raum wird liegen.",
      docMargin: new DocMargin({ bottom: 3 })
    }).docDefinition(),
    new DocLine({
      x2: (595 - 2 * 40 - 27.5) / 2,
      docMargin: new DocMargin({ bottom: 5 })
    }).docDefinition(),
    new DocText({
      text: "Mangel 1",
      isBold: true,
      docMargin: new DocMargin({ bottom: 3 })
    }).docDefinition(),
    table.docDefinition()
  ]
};

const doc = new Doc({
  docHeader: createHeader,
  docBody: createParticipantsEntry(createTestData().participantList),
  docFooter: createFooter
});

const pdfDoc = pdfPrinter.createPdfKitDocument(doc.docDefinition());

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
