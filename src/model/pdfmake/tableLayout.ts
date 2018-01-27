export class TableLayout {
  constructor(
    private readonly params: {
      readonly hLineWidth: (i: number, node: object) => number;
      readonly vLineWidth: (i: number, node: object) => number;
      readonly hLineColor: (i: number, node: object) => string;
      readonly vLineColor: (i: number, node: object) => string;
      readonly paddingLeft: (i: number, node: object) => number;
      readonly paddingRight: (i: number, node: object) => number;
      readonly paddingTop: (i: number, node: object) => number;
      readonly paddingBottom: (i: number, node: object) => number;
    }
  ) {}

  public get docDefinition(): object {
    return {
      hLineWidth: this.params.hLineWidth,
      vLineWidth: this.params.vLineWidth,
      hLineColor: this.params.hLineColor,
      vLineColor: this.params.vLineColor,
      paddingLeft: this.params.paddingLeft,
      paddingRight: this.params.paddingRight,
      paddingTop: this.params.paddingTop,
      paddingBottom: this.params.paddingBottom
    };
  }
}
