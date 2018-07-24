import { provideSingleton } from "../../../core/ioc/ioc";
import { ClientRepo } from "../../../data/client/clienRepo";
import { ClientIn } from "../../../presentation/model/clientIn";
import { clientToClientEntity } from "../../mapper/modelMapper";
import { ResponsePromise } from "../../model/response";

@provideSingleton(CreateClientTask)
export class CreateClientTask {
  private readonly repo: ClientRepo;

  constructor(repo: ClientRepo) {
    this.repo = repo;
  }

  public execute(
    client: ClientIn,
    loginCredentialsId: number
  ): ResponsePromise<number> {
    return this.repo.insert(clientToClientEntity(client, loginCredentialsId));
  }
}
