import { serialize } from "cerialize";
export class Participant {
  @serialize public readonly forename: string;
  @serialize public readonly surname: string;
  @serialize public readonly phoneNumber: string;
  @serialize public readonly email: string;
  @serialize public readonly companyName: string;

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
