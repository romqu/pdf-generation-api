import { DocMargin } from "./docMargin";
import { DocTableLayout } from "./docTableLayout";

export interface IDocBaseModel {
  doc(): object;
}

export class DocTable {
  constructor(
    private readonly params: {
      readonly docMargin: DocMargin;
      readonly widths: any;
      readonly body: object[];
      readonly docLayout: DocTableLayout;
    }
  ) {}

  public get docDefinition(): object {
    return {
      margin: this.params.docMargin.docDefinition,
      table: {
        widths: this.params.widths,
        body: [this.params.body]
      },
      layout: this.params.docLayout.docDefinition
    };
  }

  /*public appendToBody(params: {object: object}): DocTable {

  }*/
}
