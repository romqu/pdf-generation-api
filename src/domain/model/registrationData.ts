import { deserializeAs } from "cerialize";

import { LoginCredentials } from "../../domain/model/loginCredentials";
import { Client } from "./client";

export class RegistrationData {
  @deserializeAs(LoginCredentials)
  public readonly loginCredentials: LoginCredentials;
  @deserializeAs(LoginCredentials) public readonly client: Client;

  constructor(loginCredentials: LoginCredentials, client: Client) {
    this.loginCredentials = loginCredentials;
    this.client = client;
  }
}
