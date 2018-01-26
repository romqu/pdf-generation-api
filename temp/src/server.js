"use strict";

const Line = require("./model/line");
const Margin = require("./model/margin");
const Table = require("./model/table");
const Text = require("./model/text");
const Image = require("./model/image");
const TableLayout = require("./model/tableLayout");

const PdfPrinter = require("pdfmake");
const fs = require("fs");

let fonts = {
  Roboto: {
    normal: "./assets/fonts/Roboto-Regular.ttf",
    bold: "./assets/fonts/Roboto-Medium.ttf",
    italics: "./assets/fonts/Roboto-Italic.ttf",
    bolditalics: "./assets/fonts/Roboto-MediumItalic.ttf"
  }
};

const docCustomTableLayout = new TableLayout({
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
});

let content = [];
content;

for (let index = 0; index < 10; index++) {
  content.push(
    new Text({
      margin: [0, 0, 0, 0],
      text: [
        new Text({ margin: [0, 0, 0, 0], text: "Text ", fontSize: 10 }),
        new Text({ margin: [0, 0, 0, 0], text: "Text", fontSize: 11 })
      ],
      fontSize: 10
    })
  );
}

const doc = {
  content: [content]
};

const pdfPrinter = new PdfPrinter(fonts);

const pdfDoc = pdfPrinter.createPdfKitDocument(doc);

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
