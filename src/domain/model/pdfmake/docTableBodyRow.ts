import { DocEntry } from "./docEntry";
import { IDocModel } from "./docModel";

export class DocTableBodyRow implements IDocModel {
  private readonly params: IDocTableBodyRow;

  constructor(obj: IDocTableBodyRowI = {} as IDocTableBodyRowI) {
    const { entries = [] } = obj;

    this.params = { entries };
  }

  public docDefinition(): object[] {
    const docDefinitions: object[] = [];

    for (const entry of this.params.entries) {
      docDefinitions.push(entry.docDefinition());
    }
    return docDefinitions;
  }

  public addEntry(entry: DocEntry): void {
    this.params.entries.push(entry);
  }

  public addEntryList(entries: DocEntry[]): void {
    this.params.entries.push(...entries);
  }
}

interface IDocTableBodyRow {
  readonly entries: DocEntry[];
}

interface IDocTableBodyRowI {
  readonly entries?: DocEntry[];
}
