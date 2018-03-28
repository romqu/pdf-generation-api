import { serializeAs } from "cerialize";

export class LoginModel {
  @serializeAs(String, "session_id")
  public readonly sessionUuid: string;
  @serializeAs(String, "forename")
  public readonly forename: string;
  @serializeAs(String, "surname")
  public readonly surname: string;

  constructor(sessionUuid: string, forename: string, surname: string) {
    this.sessionUuid = sessionUuid;
    this.forename = forename;
    this.surname = surname;
  }
}
