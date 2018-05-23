import { deserializeAs } from "cerialize";

export class LoginIn {
  @deserializeAs(String, "e_mail")
  public readonly email: string;
  @deserializeAs(String, "password")
  public readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
