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
}
