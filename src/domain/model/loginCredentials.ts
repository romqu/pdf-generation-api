import { deserializeAs } from "cerialize";

export class LoginCredentials {
  @deserializeAs(String) public readonly email: string;
  @deserializeAs(String) public readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
