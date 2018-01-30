import { DocMargin } from "./docMargin";

export class DocImage {
  public docDefiniton: object;

  constructor(
    private readonly params: {
      readonly margin: DocMargin;
      readonly imageUrl: string;
      readonly fit: any;
    }
  ) {}

  public get docDefinition(): object {
    return {
      margin: this.params.margin.docDefinition,
      image: this.params.imageUrl,
      fit: this.params.fit
    };
  }
}
