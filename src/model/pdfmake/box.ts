class Box {
  private readonly x?: number;
  private readonly y?: number;
  private readonly height?: number;
  private readonly width?: number;

  constructor(obj: Box = {} as Box) {
    const { x = 0, y = 0, height = 0, width = 0 } = obj;

    /** Hint: put jsdoc comments here for inline ide auto-documentation */
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }
}

const box: Box = new Box({});
