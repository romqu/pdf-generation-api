import { Margin } from "./margin";
import { TableLayout } from "./tableLayout";

export class Table {
  constructor(
    private readonly params: {
      readonly margin: Margin;
      readonly widths: any;
      readonly body: any;
      readonly layout: TableLayout;
    }
  ) {}

  public get docDefinition(): object {
    return {
      margin: this.params.margin.docDefinition,
      table: {
        widths: this.params.widths,
        body: [this.params.body]
      },
      layout: this.params.layout.docDefinition
    };
  }
}
