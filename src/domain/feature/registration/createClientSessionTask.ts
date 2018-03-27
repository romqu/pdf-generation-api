import { ClientSessionRepo } from "../../../data/client_session/clientSessionRepo";
import { LoginCredentials } from "../../../domain/model/loginCredentials";
import { provide } from "../../../ioc/ioc";
import { generateUuidv4 } from "../../../util/uuidv4Util";
import { loginCredentialsToClientSessionEntity } from "../../mapper/modelMapper";
import { ResponsePromise } from "../../model/response";

@provide(CreateClientSessionTask)
  .inSingletonScope()
  .done()
export class CreateClientSessionTask {
  // create uuidv4
  // insert ClientSessionEntity into redis
  // return uuidv4

  private readonly clientSessionRepo: ClientSessionRepo;

  constructor(clientSessionRepo: ClientSessionRepo) {
    this.clientSessionRepo = clientSessionRepo;
  }

  public execute(
    loginCredentials: LoginCredentials,
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
