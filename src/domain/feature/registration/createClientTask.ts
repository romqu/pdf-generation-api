import { ClientRepo } from "../../../data/client/clienRepo";
import { clientToClientEntity } from "../../mapper/modelMapper";
import { Client } from "../../model/client";
import { ResponsePromise } from "../../model/response";

export class CreateClientTask {
  private readonly repo: ClientRepo;

  constructor(repo: ClientRepo) {
    this.repo = repo;
  }

  public execute(
    client: Client,
    loginCredentialsId: number
  ): ResponsePromise<number> {
    return this.repo.insert(clientToClientEntity(client, loginCredentialsId));
  }
}
