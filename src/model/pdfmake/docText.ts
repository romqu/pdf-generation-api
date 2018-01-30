import { DocMargin } from "./docMargin";

export class DocText {
  constructor(
    private readonly params: {
      readonly docMargin: DocMargin;
      readonly text: string;
      readonly fontSize: number;
      readonly isBold: boolean;
    }
  ) {}

  public get docDefinition(): object {
    return {
      margin: this.params.docMargin.docDefinition,
      text: this.params.text,
      fontSize: this.params.fontSize,
      bold: this.params.isBold
    };
  }
}
