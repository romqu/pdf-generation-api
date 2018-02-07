import { IDocModel } from "./docModel";
export class DocTableBodyRowEntry implements IDocModel {
  private readonly params: IDocTableBodyRowEntry;

  constructor(obj: IDocTableBodyRowEntryI = {} as IDocTableBodyRowEntryI) {
    const { docModels = [] } = obj;

    this.params = { docModels };
  }

  public docDefinition(): object[] {
    const docDefinitions: object[] = [];

    for (const docModel of this.params.docModels) {
      docDefinitions.push(docModel.docDefinition());
    }
    return docDefinitions;
  }

  public addDocModel(docModel: IDocModel): void {
    this.params.docModels.push(docModel);
  }

  public addDocModelList(docModels: IDocModel[]): void {
    this.params.docModels.push(...docModels);
  }
}

interface IDocTableBodyRowEntry {
  readonly docModels: IDocModel[];
}

interface IDocTableBodyRowEntryI {
  readonly docModels?: IDocModel[];
}
