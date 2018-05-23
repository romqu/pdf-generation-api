import { ClientRepo } from "../../../data/client/clienRepo";
import { provide } from "../../../ioc/ioc";
import { ClientIn } from "../../../presentation/model/clientIn";
import { clientToClientEntity } from "../../mapper/modelMapper";
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
    client: ClientIn,
    loginCredentialsId: number
  ): ResponsePromise<number> {
    return this.repo.insert(clientToClientEntity(client, loginCredentialsId));
  }
}
