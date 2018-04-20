import { autoserializeAs } from "cerialize";
export class DefectImage {
  @autoserializeAs(String) public readonly name: string;
  @autoserializeAs(String, "original_name")
  public readonly originalName: string;
  @autoserializeAs(Number) public readonly position: number;

  constructor(name: string, position: number, originalName: string) {
    this.name = name;
    this.originalName = originalName;
    this.position = position;
  }
}
