import { LivingUnit } from "./livingUnit";

export class Floor {
  public readonly name: string;
  public readonly livingUnitList: LivingUnit[];

  constructor(name: string, livingUnitList: LivingUnit[]) {
    this.name = name;
    this.livingUnitList = livingUnitList;
  }
}
