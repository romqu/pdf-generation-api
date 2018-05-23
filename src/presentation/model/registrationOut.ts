import { serializeAs } from "cerialize";
export class RegistrationOut {
  @serializeAs(String, "session_token")
  public readonly sessionToken: string;
  @serializeAs(Number, "client_id")
  public readonly clientId: number;
  @serializeAs(Number, "login_id")
  public readonly loginId: number;

  constructor(sessionToken: string, clientId: number, loginId: number) {
    this.sessionToken = sessionToken;
    this.clientId = clientId;
    this.loginId = loginId;
  }
}
