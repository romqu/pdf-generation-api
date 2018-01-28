import { LivingUnit } from "./livingUnit";

export class Floor {
  constructor(
    private readonly params: {
      readonly name: string;
      readonly livingUnits: LivingUnit[];
    }
  ) {}

  public get name(): string {
    return this.params.name;
  }

  public get livingUnits(): LivingUnit[] {
    return this.params.livingUnits;
  }
}
