import { Floor } from "./floor";

class DefectList {
  constructor(
    private readonly params: {
      readonly date: string;
      readonly creatorName: string;
      readonly streetName: string;
      readonly houseNumber: number;
      readonly additional: string;
      readonly floors: Floor;
    }
  ) {}
}
