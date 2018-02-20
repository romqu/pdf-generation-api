import { Image } from "./image";

export class Defect {
  @serialize public readonly description: string;
  @serialize public readonly personInCharge: string;
  @serialize public readonly doneTill: string;
  @serialize public readonly imageList: Image[];

  constructor(
    description: string,
    personInCharge: string,
    doneTill: string,
    imageList: Image[]
  ) {
    this.description = description;
    this.personInCharge = personInCharge;
    this.doneTill = doneTill;
    this.imageList = imageList;
  }
}
