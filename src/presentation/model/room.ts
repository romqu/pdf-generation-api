import { serialize } from "cerialize";

import { Defect } from "../../model/defect";

export class Room {
  @serialize public readonly name: string;
  @serialize public readonly digit: number;
  @serialize public readonly description: string;
  @serialize public readonly defectList: Defect[];

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
