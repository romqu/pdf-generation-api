import { StreetAddressEntity } from "../../../data/create_full_defect_list/streetAddressEntity";
import { Creator } from "./creator";

export class DefectList {
  public readonly name: string;
  public readonly creationDate: Date;
  public readonly creator: Creator;
  public readonly streetAddressEntity: StreetAddressEntity;

  constructor(
    name: string,
    creationDate: Date,
    creator: Creator,
    streetAddressEntity: StreetAddressEntity
  ) {
    this.name = name;
    this.creator = creator;
    this.creationDate = creationDate;
    this.streetAddressEntity = streetAddressEntity;
  }
}
