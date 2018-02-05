import { logger } from "../../logger";
import { IDocModel } from "./docModel";
import { DocText } from "./docText";

export class DocTableBodyRow implements IDocModel {
  constructor(
    private readonly params: {
      readonly docModels: IDocModel[];
    }
  ) {}

  public docDefinition(): object[] {
    const docDefinitions: object[] = [];

    for (const docModel of this.params.docModels) {
      docDefinitions.push(docModel.docDefinition());
    }
    return docDefinitions;
  }
}
