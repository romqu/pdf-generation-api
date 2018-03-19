import { deserializeAs } from "cerialize";

export class Client {
  @deserializeAs(String) public readonly forename: string;
  @deserializeAs(String) public readonly surname: string;

  constructor(forename: string, surname: string) {
    this.forename = forename;
    this.surname = surname;
  }
}
