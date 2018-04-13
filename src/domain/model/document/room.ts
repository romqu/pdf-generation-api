import { Defect } from "./defect";

export class Room {
  public readonly name: string;
  public readonly number: number;
  public readonly locationDescription: string;
  public readonly defectList: Defect[];

  constructor(
    name: string,
    // tslint:disable-next-line:variable-name
    number: number,
    locationDescription: string,
    defectList: Defect[]
  ) {
    this.name = name;
    this.number = number;
    this.locationDescription = locationDescription;
    this.defectList = defectList;
  }
}
