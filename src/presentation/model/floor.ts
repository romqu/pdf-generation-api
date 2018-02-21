import { autoserialize } from "cerialize";

import { LivingUnit } from "./livingUnit";

export class Floor {
  @autoserialize public readonly name: string;
  @autoserialize public readonly livingUnitList: LivingUnit[];

  constructor(name: string, livingUnitList: LivingUnit[]) {
    this.name = name;
    this.livingUnitList = livingUnitList;
  }
}
