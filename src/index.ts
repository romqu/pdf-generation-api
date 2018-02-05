import fs = require("fs");
import PdfPrinter = require("pdfmake");

import { CreateDoc } from "./createDoc";
import { logger } from "./logger";
import { DocMargin } from "./model/pdfmake/docMargin";
import { DocTable } from "./model/pdfmake/docTable";
import { DocTableBodyRow } from "./model/pdfmake/docTableBodyRow";
import { DocTableBodyT } from "./model/pdfmake/docTableBodyT";
import { DocTableLayout } from "./model/pdfmake/docTableLayout";
import { DocText } from "./model/pdfmake/docText";

const fonts = {
  Roboto: {
    normal: "./assets/fonts/Roboto-Regular.ttf",
    bold: "./assets/fonts/Roboto-Medium.ttf",
    italics: "./assets/fonts/Roboto-Italic.ttf",
    bolditalics: "./assets/fonts/Roboto-MediumItalic.ttf"
  }
};

const docTableLayout: DocTableLayout = new DocTableLayout({
  hLineWidth: (i: number, node: object): number => {
    return 0.1;
  },
  vLineWidth: (i: number, node: object): number => {
    return 0.1;
  },
  hLineColor: (i: number, node: object): string => {
    return "black";
  },
  vLineColor: (i: number, node: object): string => {
    return "black";
  },
  paddingLeft: (i: number, node: object): number => {
    return 0;
  },
  paddingRight: (i: number, node: object): number => {
    return 0;
  },
  paddingTop: (i: number, node: object): number => {
    return 0;
  },
  paddingBottom: (i: number, node: object): number => {
    return 0;
  }
});

const createDoc: CreateDoc = new CreateDoc({
  imageBasePath: "./assets/images/"
});

const pdfPrinter = new PdfPrinter(fonts);

const def = new DocTable({
  docMargin: new DocMargin({ left: 0, top: 0, right: 0, bottom: 0 }),
  widths: "*",
  body: new DocTableBodyT({
    numberOfColumns: 2,
    numberOfRows: 2,
    rows: [
      new DocTableBodyRow({
        docModels: [
          new DocText({
            docMargin: new DocMargin({
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            }),
            text: [
              new DocText({
                docMargin: new DocMargin({
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0
                }),
                text: "Text1",
                fontSize: 30,
                isBold: false
              }),
              new DocText({
                docMargin: new DocMargin({
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0
                }),
                text: "Text2",
                fontSize: 10,
                isBold: false
              })
            ]
          }),
          new DocText({
            docMargin: new DocMargin({
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            }),
            text: "Text",
            fontSize: 10,
            isBold: false
          }),
          new DocText({
            docMargin: new DocMargin({
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            }),
            text: "Text",
            fontSize: 10,
            isBold: false
          })
        ]
      })
    ]
  }),
  docLayout: docTableLayout
}).docDefinition();

logger.info(def);

const doc = {
  content:
    // createDoc.execute()

    [def]
};

// logger.info(doc);

const pdfDoc = pdfPrinter.createPdfKitDocument(doc);

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
