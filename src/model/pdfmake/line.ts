import { Margin } from "./margin";

export class Line {
  constructor(
    private readonly params: {
      readonly x1: number;
      readonly y1: number;
      readonly x2: number;
      readonly y2: number;
      readonly lineWidth: number;
      readonly margin: Margin;
    }
  ) {}

  public get docDefinition(): object {
    return {
      margin: this.params.margin.docDefinition,
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
