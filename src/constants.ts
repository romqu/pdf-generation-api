import { DocMargin } from "./domain/model/pdfmake/docMargin";
import { DocTableLayout } from "./domain/model/pdfmake/docTableLayout";

export const defaultDocTableLayout: DocTableLayout = new DocTableLayout({
  hLineWidth: (i: number, node: object): number => {
    return 0;
  },
  vLineWidth: (i: number, node: object): number => {
    return 0;
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

export const defaultDocMargin: DocMargin = new DocMargin({
  left: 2,
  top: 2,
  right: 2,
  bottom: 2
});

export const enum ErrorTag {
  DB = "DB",
  SERIALIZATION = "SERIALIZATION",
  DESERIALIZATION = "DESERIALIZATION",
  ARGON2HASH = "ARGON2HASH",
  EMAILEXISTS = "EMAILEXISTS"
}
