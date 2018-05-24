import { autoserializeAs } from "cerialize";

export class ClientSessionEntity {
  @autoserializeAs(String, "uuid")
  public readonly uuid: string;
  @autoserializeAs(Boolean, "is_guest")
  public readonly isGuest: boolean;
  @autoserializeAs(Number, "login_credentials_id")
  public readonly loginCredentialsId: number;
  @autoserializeAs(String, "e_mail")
  public readonly email: string;

  constructor(
    uuid: string,
    isGuest: boolean,
    loginCredentialsId: number,
    email: string
  ) {
    this.uuid = uuid;
    this.isGuest = isGuest;
    this.loginCredentialsId = loginCredentialsId;
    this.email = email;
  }
}
