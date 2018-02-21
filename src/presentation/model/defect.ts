import { autoserialize } from "cerialize";

import { Image } from "./image";

export class Defect {
  @autoserialize public readonly description: string;
  @autoserialize public readonly personInCharge: string;
  @autoserialize public readonly doneTill: string;
  @autoserialize public readonly imageList: Image[];

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
