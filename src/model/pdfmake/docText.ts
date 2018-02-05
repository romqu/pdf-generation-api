import { logger } from "../../logger";
import { DocMargin } from "./docMargin";
import { IDocModel } from "./docModel";

export class DocText implements IDocModel {
  constructor(
    private readonly params: {
      readonly docMargin: DocMargin;
      readonly text: string | DocText[];
      readonly fontSize?: number;
      readonly isBold?: boolean;
    }
  ) {}

  public docDefinition(): object {
    const textList: any[] = [];

    if (this.params.text instanceof Array) {
      for (const text of this.params.text) {
        textList.push(text.docDefinition());
      }
      return {
        margin: this.params.docMargin.docDefinition(),
        text: textList
      };
    }

    return {
      margin: this.params.docMargin.docDefinition(),
      text: this.params.text,
      fontSize: this.params.fontSize,
      bold: this.params.isBold
    };
  }
}
