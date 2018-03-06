import {
  autoserializeAs,
  autoserializeAsArray
} from "cerialize/src/annotations";

import { Defect } from "./defect";

export class Room {
  @autoserializeAs(String) public readonly name: string;
  @autoserializeAs(Number) public readonly digit: number;
  @autoserializeAs(String) public readonly description: string;
  @autoserializeAsArray(Defect) public readonly defectList: Defect[];

  constructor(
    name: string,
    digit: number,
    description: string,
    defectList: Defect[]
  ) {
    this.name = name;
    this.digit = digit;
    this.description = description;
    this.defectList = defectList;
  }
}
