import { DocEntry } from "./docEntry";
import { IDocModel } from "./docModel";

export class Doc implements IDocModel {
  public docDefinition(): object | object[] {
    throw new Error("Method not implemented.");
  }
}

interface IDoc {
  readonly docHeader: object;
  readonly docBody: DocEntry;
  readonly docFooter: (currentPage: number, pageCount: number) => object;
}
