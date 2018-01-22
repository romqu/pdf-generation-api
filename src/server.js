"use strict";

const Line = require("./model/line");
const Margin = require("./model/margin");
const Table = require("./model/table");
const Text = require("./model/text");

const PdfPrinter = require("pdfmake");
const fs = require("fs");

var fonts = {
  Roboto: {
    normal: "./assets/fonts/Roboto-Regular.ttf",
    bold: "./assets/fonts/Roboto-Medium.ttf",
    italics: "./assets/fonts/Roboto-Italic.ttf",
    bolditalics: "./assets/fonts/Roboto-MediumItalic.ttf"
  }
};

const docCustomTableLayout = {
  hLineWidth: function(i, node) {
    return 0;
  },
  vLineWidth: function(i, node) {
    return 0;
  },
  hLineColor: function(i, node) {
    return "black";
  },
  vLineColor: function(i, node) {
    return "black";
  },
  paddingLeft: function(i, node) {
    return 0;
  },
  paddingRight: function(i, node) {
    return 0;
  },
  paddingTop: function(i, node) {
    return 0;
  },
  paddingBottom: function(i, node) {
    return 0;
  }
};

let content = {};

/*for (let index = 0; index < 10; index++) {
  content.push({});
}*/

const doc = {
  content: [content]
};

const pdfPrinter = new PdfPrinter(fonts);

const pdfDoc = pdfPrinter.createPdfKitDocument(doc);

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
