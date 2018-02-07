import fs = require("fs");
import PdfPrinter = require("pdfmake");

import { CreateDoc } from "./createDoc";
import { DocTable } from "./model/pdfmake/docTable";
import { DocTableBody } from "./model/pdfmake/docTableBody";
import { DocTableBodyRow } from "./model/pdfmake/docTableBodyRow";
import { DocTableBodyRowEntry } from "./model/pdfmake/docTableBodyRowEntry";
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

const a = new DocTableBodyRow({
  entries: [
    new DocTableBodyRowEntry({
      docModels: [
        new DocText({
          text: "Beschreibung:"
        })
      ]
    }),
    new DocTableBodyRowEntry({
      docModels: [
        new DocText({
          text: "Beschreibung:"
        })
      ]
    })
  ]
});

const def = new DocTable({
  body: new DocTableBody({
    rows: [a]
  }),
  docLayout: docTableLayout
}).docDefinition();

// logger.info(def);

const doc = {
  content: createDoc.execute()

  // content: [def]
};

// logger.info(doc);

const pdfDoc = pdfPrinter.createPdfKitDocument(doc);

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
