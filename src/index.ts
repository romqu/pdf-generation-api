import * as fs from "fs";
import PdfPrinter = require("pdfmake");
import pino = require("pino");

const fonts = {
  Roboto: {
    normal: "./assets/fonts/Roboto-Regular.ttf",
    // tslint:disable-next-line:object-literal-sort-keys
    bold: "./assets/fonts/Roboto-Medium.ttf",
    italics: "./assets/fonts/Roboto-Italic.ttf",
    bolditalics: "./assets/fonts/Roboto-MediumItalic.ttf"
  }
};

const pdfPrinter = new PdfPrinter(fonts);
const pretty = pino.pretty();

pretty.pipe(process.stdout);

const log = pino(
  {
    // name: "app",
    safe: true,
    timestamp: false
  },
  pretty
);

const doc = {
  content: [[{ text: "AAAA" }]]
};

const pdfDoc = pdfPrinter.createPdfKitDocument(doc);

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
