import { autoserialize } from "cerialize";

import { Address } from "./address";
import { Creator } from "./creator";
import { Floor } from "./floor";
import { Participant } from "./participant";

export class DefectList {
  @autoserialize public readonly date: string;
  @autoserialize public readonly creator: Creator;
  @autoserialize public readonly address: Address;
  @autoserialize public readonly participantList: Participant[];
  @autoserialize public readonly floorList: Floor[];

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
