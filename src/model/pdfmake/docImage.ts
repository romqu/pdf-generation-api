import { DocMargin } from "./docMargin";
import { IDocModel } from "./docModel";

export class DocImage implements IDocModel {
  constructor(
    private readonly params: {
      readonly margin: DocMargin;
      readonly imageUrl: string;
      readonly fit: any;
    }
  ) {}

  public docDefinition(): object {
    return {
      margin: this.params.margin.docDefinition,
      image: this.params.imageUrl,
      fit: this.params.fit
    };
  }
}
