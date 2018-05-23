import { deserializeAs } from "cerialize";

import { ClientIn } from "./clientIn";
import { LoginIn } from "./loginIn";

export class RegistrationIn {
  @deserializeAs(LoginIn) public readonly loginCredentials: LoginIn;
  @deserializeAs(ClientIn) public readonly client: ClientIn;

  constructor(loginCredentials: LoginIn, client: ClientIn) {
    this.loginCredentials = loginCredentials;
    this.client = client;
  }
}
