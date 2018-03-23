import { autoserializeAs } from "cerialize";

export class ClientEntity {
  @autoserializeAs(Number, "id")
  public readonly id: number;
  @autoserializeAs(String, "forename")
  public readonly forename: string;
  @autoserializeAs(String, "surename")
  public readonly surname: string;
  @autoserializeAs(Number, "login_credentials_id")
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
