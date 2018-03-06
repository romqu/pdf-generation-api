import {
  autoserializeAs,
  autoserializeAsArray
} from "cerialize/src/annotations";

import { Room } from "./room";

export class LivingUnit {
  @autoserializeAs(Number) public readonly digit: number;
  @autoserializeAsArray(Room) public readonly roomList: Room[];

  constructor(digit: number, roomList: Room[]) {
    this.digit = digit;
    this.roomList = roomList;
  }
}
