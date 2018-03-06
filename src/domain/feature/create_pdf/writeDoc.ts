import fs = require("fs");
import PdfPrinter = require("pdfmake");

import { Doc } from "../../model/pdfmake/doc";
import { CreateDoc } from "./createDoc";
import { createFooter } from "./createFooter";
import { createHeader } from "./createHeader";

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

const doc = new Doc({
  docHeader: createHeader,
  docBody: createDoc.execute(),
  docFooter: createFooter
});

const pdfDoc = pdfPrinter.createPdfKitDocument(doc.docDefinition());

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
