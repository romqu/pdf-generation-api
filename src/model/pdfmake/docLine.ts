import { DocMargin } from "./docMargin";
import { IDocModel } from "./docModel";

export class DocLine implements IDocModel {
  private readonly params: IDocLine;

  constructor(obj: IDocLineI = {} as IDocLineI) {
    const {
      x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0,
      lineWidth = 0.75,
      docMargin = new DocMargin()
    } = obj;

    this.params = { x1, y1, x2, y2, lineWidth, docMargin };
  }

  public docDefinition(): object {
    return {
      margin: this.params.docMargin.docDefinition(),
      canvas: [
        {
          type: "line",
          x1: this.params.x1,
          y1: this.params.y1,
          x2: this.params.x2,
          y2: this.params.y2,
          lineWidth: this.params.lineWidth
        }
      ]
    };
  }
}

interface IDocLine {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly lineWidth: number;
  readonly docMargin: DocMargin;
}

interface IDocLineI {
  readonly x1?: number;
  readonly y1?: number;
  readonly x2?: number;
  readonly y2?: number;
  readonly lineWidth?: number;
  readonly docMargin?: DocMargin;
}
