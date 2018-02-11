import { DocMargin } from "./model/pdfmake/docMargin";
import { DocTableLayout } from "./model/pdfmake/docTableLayout";

export const defaultDocTableLayout: DocTableLayout = new DocTableLayout({
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

export const defaultDocMargin: DocMargin = new DocMargin({
  left: 2,
  top: 2,
  right: 2,
  bottom: 2
});