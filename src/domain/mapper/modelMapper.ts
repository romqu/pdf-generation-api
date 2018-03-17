import { ClientEntity } from "../../data/client/clientEntity";
import { Client } from "../model/client";

export function clientToClientEntity(client: Client): ClientEntity {
  return new ClientEntity(client.forename, client.surname);
}
