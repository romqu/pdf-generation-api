import { ClientSessionEntity } from "../../../data/client_session/clientSessionEntity";
import { ClientSessionRepo } from "../../../data/client_session/clientSessionRepo";
import { ResponsePromise } from "../../model/response";

export class CreateClientSessionTask {
  // create uuidv4
  // insert ClientSessionEntity into redis
  // return uuidv4

  private readonly clientSessionRepo: ClientSessionRepo;

  constructor(clientSessionRepo: ClientSessionRepo) {
    this.clientSessionRepo = clientSessionRepo;
  }

  public execute(
    clientSessionEntity: ClientSessionEntity
  ): ResponsePromise<string> {}
}
