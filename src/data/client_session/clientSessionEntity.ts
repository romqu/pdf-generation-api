import { autoserializeAs } from "cerialize";

export class ClientSessionEntity {
  @autoserializeAs(String, "uuid")
  public readonly uuid: string;
  @autoserializeAs(Number, "loginCredentialsId")
  public readonly loginCredentialsId: number;
  @autoserializeAs(String, "email")
  public readonly email: string;

  constructor(uuid: string, loginCredentialsId: number, email: string) {
    this.uuid = uuid;
    this.loginCredentialsId = loginCredentialsId;
    this.email = email;
  }
}
