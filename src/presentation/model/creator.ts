import { autoserializeAs } from "cerialize/src/annotations";
export class Creator {
  @autoserializeAs(String) public readonly forename: string;
  @autoserializeAs(String) public readonly surname: string;

  constructor(forename: string, surname: string) {
    this.forename = forename;
    this.surname = surname;
  }
}
