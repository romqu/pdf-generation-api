import { autoserialize } from "cerialize";

export class Address {
  @autoserialize public readonly streetName: string;
  @autoserialize public readonly houseNumber: number;
  @autoserialize public readonly additional: string;

  constructor(streetName: string, houseNumber: number, additional: string) {
    this.streetName = streetName;
    this.houseNumber = houseNumber;
    this.additional = additional;
  }
}
