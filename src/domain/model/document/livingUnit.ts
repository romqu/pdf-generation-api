import { autoserializeAs, autoserializeAsArray } from "cerialize";

import { Room } from "./room";

export class LivingUnit {
  @autoserializeAs(Number) public readonly number: number;
  @autoserializeAsArray(Room) public readonly roomList: Room[];

  // tslint:disable-next-line:variable-name
  constructor(number: number, roomList: Room[]) {
    this.number = number;
    this.roomList = roomList;
  }
}
