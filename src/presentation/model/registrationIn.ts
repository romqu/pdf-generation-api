import { deserializeAs } from "cerialize";

import { ClientIn } from "./clientIn";
import { LoginIn } from "./loginIn";

export class RegistrationIn {
  @deserializeAs(LoginIn, "login_credentials")
  public readonly loginCredentials: LoginIn;
  @deserializeAs(ClientIn, "client")
  public readonly client: ClientIn;

  constructor(loginCredentials: LoginIn, client: ClientIn) {
    this.loginCredentials = loginCredentials;
    this.client = client;
  }
}
