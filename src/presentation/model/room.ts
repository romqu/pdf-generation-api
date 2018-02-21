import { autoserialize } from "cerialize";

import { Defect } from "./defect";

export class Room {
  @autoserialize public readonly name: string;
  @autoserialize public readonly digit: number;
  @autoserialize public readonly description: string;
  @autoserialize public readonly defectList: Defect[];

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
