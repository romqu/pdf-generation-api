import { autoserializeAs, autoserializeAsJson } from "cerialize";

import { Creator } from "./creator";
import { StreetAddress } from "./streetAddress";

export class DefectList {
  @autoserializeAs(String) public readonly name: string;
  @autoserializeAs(String, "creation_date")
  public readonly creationDate: string;
  @autoserializeAs(Creator) public readonly creator: Creator;
  @autoserializeAs(StreetAddress, "street_address")
  public readonly streetAddress: StreetAddress;

  constructor(
    name: string,
    creationDate: string,
    creator: Creator,
    streetAddress: StreetAddress
  ) {
    this.name = name;
    this.creator = creator;
    this.creationDate = creationDate;
    this.streetAddress = streetAddress;
  }
}
