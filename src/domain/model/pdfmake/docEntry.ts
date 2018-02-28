import { IDocModel } from "./docModel";
export class DocEntry implements IDocModel {
  private readonly params: IDocEntry;

  constructor(obj: IDocEntryI = {} as IDocEntryI) {
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

  public addDocModelList(docModelList: IDocModel[]): void {
    this.params.docModels.push(...docModelList);
  }
}

interface IDocEntry {
  readonly docModels: IDocModel[];
}

interface IDocEntryI {
  readonly docModels?: IDocModel[];
}
