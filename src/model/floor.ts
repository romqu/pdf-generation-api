import { Room } from "./room";

export class Floor {
  constructor(
    private readonly params: {
      readonly name: string;
      readonly livingUnitNumber: number;
      readonly rooms: Room[];
    }
  ) {}
}
