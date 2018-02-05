import { IDocModel } from "./docModel";
export class DocMargin implements IDocModel {
  constructor(
    private readonly params: {
      readonly left: number;
      readonly top: number;
      readonly right: number;
      readonly bottom: number;
    }
  ) {}

  public docDefinition(): object {
    return [
      this.params.left,
      this.params.top,
      this.params.right,
      this.params.bottom
    ];
  }
}
