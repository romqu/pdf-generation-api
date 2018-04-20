import { autoserializeAs, autoserializeAsArray } from "cerialize";

import { LivingUnit } from "./livingUnit";

export class Floor {
  @autoserializeAs(String) public readonly name: string;
  @autoserializeAsArray(LivingUnit, "living_unit_list")
  public readonly livingUnitList: LivingUnit[];

  constructor(name: string, livingUnitList: LivingUnit[]) {
    this.name = name;
    this.livingUnitList = livingUnitList;
  }
}
