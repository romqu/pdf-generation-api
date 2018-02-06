import { DocMargin } from "./docMargin";
import { IDocModel } from "./docModel";
import { DocTableBodyT } from "./docTableBodyT";
import { DocTableLayout } from "./docTableLayout";

export class DocTable implements IDocModel {
  private readonly params: IDocTableParams;

  constructor(obj: IDocTableParamsI = {} as IDocTableParamsI) {
    const { docMargin = new DocMargin(), widths = "*", body, docLayout } = obj;

    this.params = { docMargin, widths, body, docLayout };
  }

  public docDefinition(): object {
    return {
      margin: this.params.docMargin.docDefinition(),
      table: {
        widths: this.params.widths,
        body: this.params.body.docDefinition()
      },
      layout: this.params.docLayout.docDefinition()
    };
  }
}

interface IDocTableParams {
  readonly docMargin: DocMargin;
  readonly widths: any;
  readonly body: DocTableBodyT;
  readonly docLayout: DocTableLayout;
}

interface IDocTableParamsI {
  readonly docMargin?: DocMargin;
  readonly widths: any;
  readonly body: DocTableBodyT;
  readonly docLayout: DocTableLayout;
}
