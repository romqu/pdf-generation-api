import fs = require("fs");
import PdfPrinter = require("pdfmake");

import { createFooter } from "./create_pdf/createFooter";
import { createHeader } from "./create_pdf/createHeader";
import { CreateDoc } from "./createDoc";
import { Doc } from "./model/pdfmake/doc";
import { DocEntry } from "./model/pdfmake/docEntry";

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

const doc = new Doc({
  docHeader: createHeader,
  docBody: createDoc.execute(),
  docFooter: createFooter
});

const pdfDoc = pdfPrinter.createPdfKitDocument(doc.docDefinition());

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
