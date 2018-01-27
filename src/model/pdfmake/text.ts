import { Margin } from "./margin";

export class Text {
  constructor(
    private readonly params: {
      readonly margin: Margin;
      readonly text: string;
      readonly fontSize: number;
      readonly isBold: boolean;
    }
  ) {}

  public get docDefinition(): object {
    return {
      margin: this.params.margin.docDefinition,
      text: this.params.text,
      fontSize: this.params.fontSize,
      bold: this.params.isBold
    };
  }
}
