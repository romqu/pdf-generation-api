import { DocMargin } from "./docMargin";
import { IDocModel } from "./docModel";
import { DocTableBodyT } from "./docTableBodyT";
import { DocTableLayout } from "./docTableLayout";

export class DocTable implements IDocModel {
  constructor(
    private readonly params: {
      readonly docMargin: DocMargin;
      readonly widths: any;
      readonly body: DocTableBodyT;
      readonly docLayout: DocTableLayout;
    }
  ) {}

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
