export class ClientEntity {
  public readonly id: number;
  public readonly forename: string;
  public readonly surname: string;
  public readonly loginCredentialsId: number;

  constructor(
    id: number,
    forename: string,
    surname: string,
    loginCredentialsId: number
  ) {
    this.id = id;
    this.forename = forename;
    this.surname = surname;
    this.loginCredentialsId = loginCredentialsId;
  }
}
