import { DocMargin } from "./docMargin";
import { IDocModel } from "./docModel";

export class DocText implements IDocModel {
  private readonly params: IDocTextParams;

  constructor(obj: IDocTextParamsI = {} as IDocTextParamsI) {
    const {
      docMargin = new DocMargin(),
      text = "Text",
      fontSize = 9.5,
      isBold = false,
      alignment = "left"
    } = obj;

    this.params = { docMargin, text, fontSize, isBold, alignment };
  }

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
      bold: this.params.isBold,
      alignment: this.params.alignment
    };
  }
}

interface IDocTextParamsI {
  readonly docMargin?: DocMargin;
  readonly text?: string | DocText[];
  readonly fontSize?: number;
  readonly isBold?: boolean;
  readonly alignment?: string;
}

interface IDocTextParams {
  readonly docMargin: DocMargin;
  readonly text: string | DocText[];
  readonly fontSize: number;
  readonly isBold: boolean;
  readonly alignment: string;
}
