import { IDocModel } from "./docModel";
export class DocMargin implements IDocModel {
  private readonly params: IDocMarginParams;

  constructor(readonly obj: IDocMarginParamsI = {} as IDocMarginParamsI) {
    const { left = 0, top = 0, right = 0, bottom = 0 } = obj;

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
