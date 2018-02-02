import { DocMargin } from "./docMargin";
import { DocTableBody } from "./docTableBody";
import { DocTableLayout } from "./docTableLayout";

export class DocTable {
  constructor(
    private readonly params: {
      readonly docMargin: DocMargin;
      readonly widths: any;
      readonly body: DocTableBody;
      readonly docLayout: DocTableLayout;
    }
  ) {}

  public get docDefinition(): object {
    return {
      margin: this.params.docMargin.docDefinition,
      table: {
        widths: this.params.widths,
        body: this.params.body.docDefinition
      },
      layout: this.params.docLayout.docDefinition
    };
  }
}
