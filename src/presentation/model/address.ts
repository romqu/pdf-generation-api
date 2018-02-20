import { serialize } from "cerialize";

export class Address {
  @serialize public readonly streetName: string;
  @serialize public readonly houseNumber: number;
  @serialize public readonly additional: string;

  constructor(streetName: string, houseNumber: number, additional: string) {
    this.streetName = streetName;
    this.houseNumber = houseNumber;
    this.additional = additional;
  }
}
