import { autoserializeAs } from "cerialize";

export class ClientEntity {
  @autoserializeAs(Number, "id")
  public readonly id: number;
  @autoserializeAs(String, "forename")
  public readonly forename: string;
  @autoserializeAs(String, "surname")
  public readonly surname: string;
  @autoserializeAs(Number, "login_credentials_id")
  public readonly loginCredentialsId: number;

  constructor(
    id: number = 0,
    forename: string,
    surname: string,
    loginCredentialsId: number = 0
  ) {
    this.id = id;
    this.forename = forename;
    this.surname = surname;
    this.loginCredentialsId = loginCredentialsId;
  }
}
