import { Floor } from "./floor";

export class DefectList {
  constructor(
    private readonly params: {
      readonly date: string;
      readonly creatorName: string;
      readonly streetName: string;
      readonly houseNumber: number;
      readonly additional: string;
      readonly floors: Floor[];
    }
  ) {}

  public get date(): string {
    return this.params.date;
  }

  public get creatorName(): string {
    return this.params.creatorName;
  }
  public get streetName(): string {
    return this.params.streetName;
  }
  public get houseNumber(): number {
    return this.params.houseNumber;
  }

  public get additional(): string {
    return this.params.additional;
  }

  public get floors(): Floor[] {
    return this.params.floors;
  }
}
