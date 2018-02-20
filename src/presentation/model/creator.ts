import { serialize } from "cerialize";
export class Creator {
  @serialize public readonly forename: string;
  @serialize public readonly surname: string;

  constructor(forename: string, surname: string) {
    this.forename = forename;
    this.surname = surname;
  }
}
