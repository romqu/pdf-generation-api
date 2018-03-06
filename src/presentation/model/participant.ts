import { autoserializeAs } from "cerialize/src/annotations";

export class Participant {
  @autoserializeAs(String) public readonly forename: string;
  @autoserializeAs(String) public readonly surname: string;
  @autoserializeAs(String) public readonly phoneNumber: string;
  @autoserializeAs(String) public readonly email: string;
  @autoserializeAs(String) public readonly companyName: string;

  constructor(
    forename: string,
    surname: string,
    phoneNumber: string,
    email: string,
    companyName: string
  ) {
    this.forename = forename;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.companyName = companyName;
  }
}
