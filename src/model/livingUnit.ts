import { Room } from "./room";

export class LivingUnit {
  constructor(
    private readonly params: {
      readonly number: number;
      readonly rooms: Room[];
    }
  ) {}

  public get number(): number {
    return this.params.number;
  }
}
