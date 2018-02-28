import { Image } from "./image";

export class Defect {
  constructor(
    private readonly params: {
      readonly description: string;
      readonly personInCharge: string;
      readonly doneTill: string;
      readonly images: Image[];
    }
  ) {}

  public get description(): string {
    return this.params.description;
  }

  public get personInCharge(): string {
    return this.params.personInCharge;
  }

  public get doneTill(): string {
    return this.params.doneTill;
  }

  public get images(): Image[] {
    return this.params.images;
  }
}
