import { DocMargin } from "./docMargin";
import { IDocModel } from "./docModel";

export class DocImage implements IDocModel {
  private readonly params: IDocImage;

  constructor(obj: IDocImageI = {} as IDocImageI) {
    const {
      margin = new DocMargin(),
      imageUrl = "",
      fit = [100, 100],
      alignment = "left"
    } = obj;

    this.params = { margin, imageUrl, fit, alignment };
  }

  public docDefinition(): object {
    return {
      margin: this.params.margin.docDefinition,
      image: this.params.imageUrl,
      fit: this.params.fit
    };
  }
}

interface IDocImage {
  readonly margin: DocMargin;
  readonly imageUrl: string;
  readonly fit: any;
  readonly alignment: string;
}

interface IDocImageI {
  readonly margin?: DocMargin;
  readonly imageUrl?: string;
  readonly fit?: any;
  readonly alignment?: string;
}
