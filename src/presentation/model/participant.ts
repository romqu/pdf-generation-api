import { autoserialize } from "cerialize";

export class Participant {
  @autoserialize public readonly forename: string;
  @autoserialize public readonly surname: string;
  @autoserialize public readonly phoneNumber: string;
  @autoserialize public readonly email: string;
  @autoserialize public readonly companyName: string;

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
