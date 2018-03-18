import { ClientEntity } from "../../data/client/clientEntity";
import { ClientSessionEntity } from "../../data/client_session/clientSessionEntity";
import { LoginCredentialsEntity } from "../../data/login_credentials/loginCredentialsEntity";
import { LoginCredentials } from "../../domain/model/loginCredentials";
import { Client } from "../model/client";

export function clientToClientEntity(
  client: Client,
  loginCredentialsId: number
): ClientEntity {
  return new ClientEntity(
    0,
    client.forename,
    client.surname,
    loginCredentialsId
  );
}

export function loginCredentialsToLoginCredentialsEntity(
  loginCredentials: LoginCredentials,
  passwordHash: string
): LoginCredentialsEntity {
  return new LoginCredentialsEntity({
    id: 0,
    email: loginCredentials.email,
    passwordHash
  });
}

export function loginCredentialsToClientSessionEntity(
  loginCredentials: LoginCredentials,
  uuid: string,
  id: number
): ClientSessionEntity {
  return new ClientSessionEntity(uuid, id, loginCredentials.email);
}
