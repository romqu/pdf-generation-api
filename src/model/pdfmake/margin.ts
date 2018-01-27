export class Margin {
  constructor(
    private readonly params: {
      readonly left: number;
      readonly top: number;
      readonly right: number;
      readonly bottom: number;
    }
  ) {}

  public get docDefinition(): object {
    return [
      this.params.left,
      this.params.top,
      this.params.right,
      this.params.bottom
    ];
  }
}
