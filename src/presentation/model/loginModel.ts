export class LoginModel {
  public readonly sessionUuid: string;
  public readonly forename: string;
  public readonly surname: string;

  constructor(sessionUuid: string, forename: string, surname: string) {
    this.sessionUuid = sessionUuid;
    this.forename = forename;
    this.surname = surname;
  }
}
