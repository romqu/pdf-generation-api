import { Creator } from "./creator";
import { Floor } from "./floor";
import { Participant } from "./participant";

export class DefectList {
  constructor(
    private readonly params: {
      readonly date: string;
      readonly creator: Creator;
      readonly streetName: string;
      readonly houseNumber: number;
      readonly additional: string;
      readonly participantList: Participant[];
      readonly floors: Floor[];
    }
  ) {}

  public get date(): string {
    return this.params.date;
  }

  public get creatorName(): Creator {
    return this.params.creator;
  }
  public get streetName(): string {
    return this.params.streetName;
  }
  public get houseNumber(): number {
    return this.params.houseNumber;
  }

  public get additional(): string {
    return this.params.additional;
  }

  public get floors(): Floor[] {
    return this.params.floors;
  }

  public get participantList(): Participant[] {
    return this.params.participantList;
  }
}
