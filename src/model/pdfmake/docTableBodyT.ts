import { IDocModel } from "./docModel";
import { DocTableBodyRow } from "./docTableBodyRow";

export class DocTableBodyT implements IDocModel {
  constructor(
    private readonly params: {
      readonly numberOfColumns: number;
      readonly numberOfRows: number;
      readonly rows: DocTableBodyRow[];
    }
  ) {}

  public docDefinition(): object[] {
    const definition: object[] = [];
    for (const row of this.params.rows) {
      definition.push(row.docDefinition());
    }
    return definition;
  }

  public append(params: { readonly row: DocTableBodyRow }): DocTableBodyT {
    return new DocTableBodyT({
      numberOfColumns: this.params.numberOfColumns,
      numberOfRows: this.params.numberOfRows,
      rows: [...this.params.rows, params.row]
    });
  }
}
