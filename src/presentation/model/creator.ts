import { autoserialize } from "cerialize";

export class Creator {
  @autoserialize public readonly forename: string;
  @autoserialize public readonly surname: string;

  constructor(forename: string, surname: string) {
    this.forename = forename;
    this.surname = surname;
  }
}
