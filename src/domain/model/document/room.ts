import { autoserializeAs, autoserializeAsArray } from "cerialize";

import { Defect } from "./defect";

export class Room {
  @autoserializeAs(String) public readonly name: string;
  @autoserializeAs(Number) public readonly number: number;
  @autoserializeAs(String, "location_description")
  public readonly locationDescription: string;
  @autoserializeAsArray(Defect, "defect_list")
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
