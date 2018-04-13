import { Floor } from "./floor";
import { ViewParticipant } from "./viewParticipant";

export class StreetAddress {
  public readonly name: string;
  public readonly number: number;
  public readonly additional: string;
  public readonly postalCode: number;
  public readonly floorList: Floor[];
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
