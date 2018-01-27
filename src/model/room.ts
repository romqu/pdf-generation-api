import { Defect } from "./defect";

export class Room {
  constructor(
    private readonly params: {
      readonly name: string;
      readonly number: number;
      readonly description: string;
      readonly defects: Defect[];
    }
  ) {}
}
