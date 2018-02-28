import { IDocModel } from "./docModel";
import { DocTableBodyRow } from "./docTableBodyRow";

export class DocTableBody implements IDocModel {
  private readonly params: IDocTableBody;

  constructor(obj: IDocTableBodyI = {} as IDocTableBodyI) {
    const { numberOfColumns = 2, numberOfRows = 1, rows = [] } = obj;

    this.params = { numberOfColumns, numberOfRows, rows };
  }

  public docDefinition(): object[] {
    const definition: object[] = [];
    for (const row of this.params.rows) {
      definition.push(row.docDefinition());
    }
    return definition;
  }

  public addRow(row: DocTableBodyRow): void {
    this.params.rows.push(row);

    /*return new DocTableBody({
      numberOfColumns: this.params.numberOfColumns,
      numberOfRows: this.params.numberOfRows,
      rows: [...this.params.rows, params.row]
    });*/
  }
  public addRows(rows: DocTableBodyRow[]): void {
    this.params.rows.push(...rows);
  }
}

interface IDocTableBody {
  readonly numberOfColumns: number;
  readonly numberOfRows: number;
  readonly rows: DocTableBodyRow[];
}

interface IDocTableBodyI {
  readonly numberOfColumns?: number;
  readonly numberOfRows?: number;
  readonly rows?: DocTableBodyRow[];
}
