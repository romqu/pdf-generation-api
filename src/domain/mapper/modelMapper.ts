import { ClientEntity } from "../../data/client/clientEntity";
import { ClientSessionEntity } from "../../data/client_session/clientSessionEntity";
import { LoginCredentialsEntity } from "../../data/login_credentials/loginCredentialsEntity";
import { ClientIn } from "../../presentation/model/clientIn";
import { LoginIn } from "../../presentation/model/loginIn";

export function clientToClientEntity(
  client: ClientIn,
  loginCredentialsId: number
): ClientEntity {
  return new ClientEntity(
    0,
    client.forename,
    client.surname,
    loginCredentialsId
  );
}

export function loginInToLoginCredentialsEntity(
  loginCredentials: LoginIn,
  passwordHash: string
): LoginCredentialsEntity {
  return new LoginCredentialsEntity(0, loginCredentials.email, passwordHash);
}

export function loginCredentialsToClientSessionEntity(
  loginCredentials: LoginIn,
  isGuest: boolean,
  uuid: string,
  id: number
): ClientSessionEntity {
  return new ClientSessionEntity(uuid, isGuest, id, loginCredentials.email);
}
