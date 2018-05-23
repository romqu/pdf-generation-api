import { ClientSessionRepo } from "../../../data/client_session/clientSessionRepo";
import { provide } from "../../../ioc/ioc";
import { LoginIn } from "../../../presentation/model/loginIn";
import { generateUuidv4 } from "../../../util/uuidv4Util";
import { loginCredentialsToClientSessionEntity } from "../../mapper/modelMapper";
import { ResponsePromise } from "../../model/response";

@provide(CreateClientSessionTask)
  .inSingletonScope()
  .done()
export class CreateClientSessionTask {
  private readonly clientSessionRepo: ClientSessionRepo;

  constructor(clientSessionRepo: ClientSessionRepo) {
    this.clientSessionRepo = clientSessionRepo;
  }

  public execute(
    loginCredentials: LoginIn,
    id: number
  ): ResponsePromise<string> {
    return this.clientSessionRepo.insert({
      value: loginCredentialsToClientSessionEntity(
        loginCredentials,
        generateUuidv4(),
        id
      )
    });
  }
}
