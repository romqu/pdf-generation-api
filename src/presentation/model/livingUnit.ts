import { serialize } from "cerialize";

import { Room } from "./room";

export class LivingUnit {
  @serialize public readonly digit: number;
  @serialize public readonly roomList: Room[];

  constructor(digit: number, roomList: Room[]) {
    this.digit = digit;
    this.roomList = roomList;
  }
}
