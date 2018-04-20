import { autoserializeAs, autoserializeAsArray } from "cerialize";

import { Floor } from "./floor";
import { ViewParticipant } from "./viewParticipant";

export class StreetAddress {
  @autoserializeAs(String) public readonly name: string;
  @autoserializeAs(Number) public readonly number: number;
  @autoserializeAs(String) public readonly additional: string;
  @autoserializeAs(Number) public readonly postalCode: number;
  @autoserializeAsArray(Floor) public readonly floorList: Floor[];
  @autoserializeAsArray(ViewParticipant)
  public readonly viewParticipantList: ViewParticipant[];

  constructor(
    name: string,
    // tslint:disable-next-line:variable-name
    number: number,
    additional: string,
    postalCode: number,
    floorList: Floor[],
    viewParticipantList: ViewParticipant[]
  ) {
    this.name = name;
    this.number = number;
    this.additional = additional;
    this.postalCode = postalCode;
    this.floorList = floorList;
    this.viewParticipantList = viewParticipantList;
  }
}
