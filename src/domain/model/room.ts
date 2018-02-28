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

  public get name(): string {
    return this.params.name;
  }

  public get number(): number {
    return this.params.number;
  }

  public get description(): string {
    return this.params.description;
  }

  public get defects(): Defect[] {
    return this.params.defects;
  }
}
