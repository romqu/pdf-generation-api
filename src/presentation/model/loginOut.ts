import { serializeAs } from "cerialize";

export class LoginOut {
  @serializeAs(String, "session_token")
  public readonly sessionToken: string;
  @serializeAs(Number, "client_id")
  public readonly clientId: number;
  @serializeAs(Number, "login_id")
  public readonly loginId: number;
  @serializeAs(String, "forename")
  public readonly forename: string;
  @serializeAs(String, "surname")
  public readonly surname: string;

  constructor(
    sessionToken: string,
    clientId: number,
    loginId: number,
    forename: string,
    surname: string
  ) {
    this.sessionToken = sessionToken;
    this.clientId = clientId;
    this.loginId = loginId;
    this.forename = forename;
    this.surname = surname;
  }
}
