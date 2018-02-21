import { autoserialize } from "cerialize";

import { Room } from "./room";

export class LivingUnit {
  @autoserialize public readonly digit: number;
  @autoserialize public readonly roomList: Room[];

  constructor(digit: number, roomList: Room[]) {
    this.digit = digit;
    this.roomList = roomList;
  }
}
