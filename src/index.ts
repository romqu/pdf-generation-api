import fs = require("fs");
import PdfPrinter = require("pdfmake");

import { CreateDoc } from "./createDoc";
import { DocMargin } from "./model/pdfmake/docMargin";
import { DocTable } from "./model/pdfmake/docTable";
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

const doc = {
  content: [
    createDoc.execute()
    /*new DocTable({
      docMargin: new DocMargin({ left: 0, top: 0, right: 0, bottom: 0 }),
      widths: "*",
      body: [
        new DocText({
          docMargin: new DocMargin({ left: 0, top: 0, right: 0, bottom: 0 }),
          text: "A",
          fontSize: 10,
          isBold: false
        }).docDefinition
      ],
      docLayout: docTableLayout
    }).docDefinition*/
  ]
};

const pdfDoc = pdfPrinter.createPdfKitDocument(doc);

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
