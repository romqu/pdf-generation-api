import { autoserializeAs } from "cerialize";

export class ViewParticipant {
  @autoserializeAs(String) public readonly forename: string;
  @autoserializeAs(String) public readonly surname: string;
  @autoserializeAs(Number) public readonly phoneNumber: number;
  @autoserializeAs(String) public readonly email: string;
  @autoserializeAs(String) public readonly companyName: string;

  constructor(
    forename: string,
    surname: string,
    phoneNumber: number,
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
