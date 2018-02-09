import { DocEntry } from "./docEntry";
import { DocMargin } from "./docMargin";
import { IDocModel } from "./docModel";

export class DocStack implements IDocModel {
  private readonly params: IDocStack;

  constructor(readonly obj: IDocStackI = {} as IDocStackI) {
    const { docEntryList = [] } = obj;

    this.params = { docEntryList };
  }

  public docDefinition(): object {
    const docDefinitions: object[] = [];

    for (const entry of this.params.docEntryList) {
      docDefinitions.push(entry.docDefinition());
    }

    const a = { stack: docDefinitions };
    const b = { margin: new DocMargin({ left: 40 }).docDefinition() };
    return {
      ...a,
      ...b
    };
  }
}

interface IDocStack {
  readonly docEntryList: DocEntry[];
}

interface IDocStackI {
  readonly docEntryList?: DocEntry[];
}
