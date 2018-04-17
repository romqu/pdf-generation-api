export class DefectImage {
  public readonly name: string;
  public readonly originalName: string;
  public readonly position: number;

  constructor(name: string, position: number, originalName: string) {
    this.name = name;
    this.originalName = originalName;
    this.position = position;
  }
}
