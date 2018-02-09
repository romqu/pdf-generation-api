import fs = require("fs");
import PdfPrinter = require("pdfmake");

import { CreateDoc } from "./createDoc";
import { DocMargin } from "./model/pdfmake/docMargin";
import { DocText } from "./model/pdfmake/docText";

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
  content: createDoc.execute()
};

// logger.info(doc);

const pdfDoc = pdfPrinter.createPdfKitDocument(doc);

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
