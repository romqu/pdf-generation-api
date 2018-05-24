import { autoserializeAs } from "cerialize";

export class ClientSessionEntity {
  @autoserializeAs(String, "uuid")
  public readonly uuid: string;
  @autoserializeAs(Number, "login_credentials_id")
  public readonly loginCredentialsId: number;
  @autoserializeAs(String, "e_mail")
  public readonly email: string;

  constructor(uuid: string, loginCredentialsId: number, email: string) {
    this.uuid = uuid;
    this.loginCredentialsId = loginCredentialsId;
    this.email = email;
  }
}
