export class Participant {
  constructor(
    private readonly params: {
      readonly forename: string;
      readonly surname: string;
      readonly phoneNumber: string;
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
}
