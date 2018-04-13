import { Room } from "./room";

export class LivingUnit {
  public readonly number: number;
  public readonly roomList: Room[];

  // tslint:disable-next-line:variable-name
  constructor(number: number, roomList: Room[]) {
    this.number = number;
    this.roomList = roomList;
  }
}
