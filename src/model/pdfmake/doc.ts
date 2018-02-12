import { DocEntry } from "./docEntry";
import { IDocModel } from "./docModel";

export class Doc implements IDocModel {
  private readonly params: IDoc;

  constructor(obj: IDocI = {} as IDocI) {
    const {
      docHeader = (): object[] => [{}],
      docBody,
      docFooter = (currentPage: number, pageCount: number): object => ({})
    } = obj;

    this.params = { docHeader, docBody, docFooter };
  }

  public docDefinition(): object {
    return {
      pageMargins: [40, 60, 40, 40],
      header: this.params.docHeader(),
      footer: this.params.docFooter,
      content: this.params.docBody.docDefinition()
    };
  }
}

interface IDoc {
  readonly docHeader: () => object[];
  readonly docBody: DocEntry;
  readonly docFooter: (currentPage: number, pageCount: number) => object;
}

interface IDocI {
  readonly docHeader?: () => object[];
  readonly docBody: DocEntry;
  readonly docFooter?: (currentPage: number, pageCount: number) => object;
}
