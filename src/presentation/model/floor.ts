import { serialize } from "cerialize";

import { LivingUnit } from "./livingUnit";

export class Floor {
  @serialize public readonly name: string;
  @serialize public readonly livingUnitList: LivingUnit[];

  constructor(name: string, livingUnitList: LivingUnit[]) {
    this.name = name;
    this.livingUnitList = livingUnitList;
  }
}
