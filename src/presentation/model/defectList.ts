import { serialize } from "cerialize";

import { Address } from "./address";
import { Creator } from "./creator";
import { Floor } from "./floor";
import { Participant } from "./participant";

export class DefectList {
  @serialize public readonly date: string;
  @serialize public readonly creator: Creator;
  @serialize public readonly address: Address;
  @serialize public readonly participantList: Participant[];
  @serialize public readonly floorList: Floor[];

  constructor(
    date: string,
    creator: Creator,
    address: Address,
    participantList: Participant[],
    floorList: Floor[]
  ) {
    this.date = date;
    this.creator = creator;
    this.address = address;
    this.participantList = participantList;
    this.floorList = floorList;
  }
}
