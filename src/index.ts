import fs = require("fs");
import PdfPrinter = require("pdfmake");

import { createFooter } from "./create_pdf/createFooter";
import { createHeader } from "./create_pdf/createHeader";
import { CreateDoc } from "./createDoc";

const fonts = {
  Roboto: {
    normal: "./assets/fonts/Roboto-Regular.ttf",
    bold: "./assets/fonts/Roboto-Medium.ttf",
    italics: "./assets/fonts/Roboto-Italic.ttf",
    bolditalics: "./assets/fonts/Roboto-MediumItalic.ttf"
  }
};

const createDoc: CreateDoc = new CreateDoc({
  imageBasePath: "./assets/images/"
});

const pdfPrinter = new PdfPrinter(fonts);

const doc = {
  pageMargins: [40, 60, 40, 40],
  header: createHeader(),
  footer: createFooter,
  content: createDoc.execute()

  // content: [new DocText().docDefinition()]
};

const pdfDoc = pdfPrinter.createPdfKitDocument(doc);

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
