import { Creator } from "./creator";
import { StreetAddress } from "./streetAddress";

export class DefectList {
  public readonly name: string;
  public readonly creationDate: Date;
  public readonly creator: Creator;
  public readonly streetAddress: StreetAddress;

  constructor(
    name: string,
    creationDate: Date,
    creator: Creator,
    streetAddress: StreetAddress
  ) {
    this.name = name;
    this.creator = creator;
    this.creationDate = creationDate;
    this.streetAddress = streetAddress;
  }
}
