import { DocEntry } from "./docEntry";
import { DocMargin } from "./docMargin";
import { IDocModel } from "./docModel";

export class DocStack implements IDocModel {
  private readonly params: IDocStack;

  constructor(readonly obj: IDocStackI = {} as IDocStackI) {
    const { docEntryList = [], stackArgumentList = [] } = obj;

    this.params = { docEntryList, stackArgumentList };
  }

  public docDefinition(): object {
    const docDefinitions: object[] = [];
    let stackArguments: object = {};

    for (const entry of this.params.docEntryList) {
      docDefinitions.push(entry.docDefinition());
    }

    for (const stackArgument of this.params.stackArgumentList) {
      stackArguments = { ...stackArguments, ...stackArgument };
    }

    return {
      stack: docDefinitions,
      ...stackArguments
    };
  }

  public addMargin(docMargin: DocMargin): DocStack {
    this.params.stackArgumentList.push({ margin: docMargin.docDefinition() });
    return this;
  }
}

interface IDocStack {
  readonly docEntryList: DocEntry[];
  readonly stackArgumentList: object[];
}

interface IDocStackI {
  readonly docEntryList?: DocEntry[];
  readonly stackArgumentList?: object[];
}
