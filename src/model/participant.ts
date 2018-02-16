export class Participant {
  constructor(
    private readonly params: {
      readonly forename: string;
      readonly surname: string;
      readonly phoneNumber: string;
      readonly email: string;
      readonly companyName: string;
    }
  ) {}

  public get forename(): string {
    return this.params.forename;
  }

  public get surname(): string {
    return this.params.surname;
  }

  public get phoneNumber(): string {
    return this.params.phoneNumber;
  }

  public get email(): string {
    return this.params.email;
  }

  public get companyName(): string {
    return this.params.companyName;
  }
}
