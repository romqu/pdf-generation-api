import { ClientRepo } from "../../../data/client/clienRepo";
import { provide } from "../../../ioc/ioc";
import { clientToClientEntity } from "../../mapper/modelMapper";
import { Client } from "../../model/client";
import { ResponsePromise } from "../../model/response";

@provide(CreateClientTask)
  .inSingletonScope()
  .done()
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
