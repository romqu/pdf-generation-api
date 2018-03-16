import { LoginCredentials } from "../../domain/model/loginCredentials";
import { Client } from "./client";

export class Registration {
  public readonly loginCredentials: LoginCredentials;
  public readonly client: Client;

  constructor(loginCredentials: LoginCredentials, client: Client) {
    this.loginCredentials = loginCredentials;
    this.client = client;
  }
}
