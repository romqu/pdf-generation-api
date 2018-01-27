import * as fs from "fs";
import PdfPrinter = require("pdfmake");
import pino = require("pino");
import { Image } from "./model/pdfmake/image";
import { Line } from "./model/pdfmake/line";
import { Margin } from "./model/pdfmake/margin";
import { Table } from "./model/pdfmake/table";
import { TableLayout } from "./model/pdfmake/tableLayout";
import { Text } from "./model/pdfmake/text";

const fonts = {
  Roboto: {
    normal: "./assets/fonts/Roboto-Regular.ttf",
    bold: "./assets/fonts/Roboto-Medium.ttf",
    italics: "./assets/fonts/Roboto-Italic.ttf",
    bolditalics: "./assets/fonts/Roboto-MediumItalic.ttf"
  }
};

const docTableLayout: TableLayout = new TableLayout({
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
  content: [
    new Table({
      margin: new Margin({ left: 0, top: 0, right: 0, bottom: 0 }),
      widths: "*",
      body: [
        new Text({
          margin: new Margin({ left: 0, top: 0, right: 0, bottom: 0 }),
          text: "A",
          fontSize: 10,
          isBold: false
        }).docDefinition
      ],
      layout: docTableLayout
    }).docDefinition
  ]
};

const b = (a: number): number => {
  return 2;
};

const pdfDoc = pdfPrinter.createPdfKitDocument(doc);

pdfDoc.pipe(fs.createWriteStream("./pdfs/prototype.pdf"));

pdfDoc.end();
