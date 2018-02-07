import { IDocModel } from "./docModel";
export class DocMargin implements IDocModel {
  private readonly params: IDocMarginParams;

  constructor(readonly obj: IDocMarginParamsI = {} as IDocMarginParamsI) {
    const { left = 5, top = 5, right = 5, bottom = 5 } = obj;

    this.params = { left, top, right, bottom };
  }

  public docDefinition(): object {
    return [
      this.params.left,
      this.params.top,
      this.params.right,
      this.params.bottom
    ];
  }
}

interface IDocMarginParams {
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
}

interface IDocMarginParamsI {
  readonly left?: number;
  readonly top?: number;
  readonly right?: number;
  readonly bottom?: number;
}
