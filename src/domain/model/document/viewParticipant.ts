export class ViewParticipant {
  public readonly forename: string;
  public readonly surname: string;
  public readonly phoneNumber: string;
  public readonly email: string;
  public readonly companyName: string;

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
