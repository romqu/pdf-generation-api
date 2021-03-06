import { provideSingleton } from "../../../core/ioc/ioc";
import { ClientSessionRepo } from "../../../data/client_session/clientSessionRepo";
import { LoginIn } from "../../../presentation/model/loginIn";
import { generateUuidv4 } from "../../../util/uuidv4Util";
import { loginCredentialsToClientSessionEntity } from "../../mapper/modelMapper";
import { ResponsePromise } from "../../model/response";

@provideSingleton(CreateClientSessionTask)
export class CreateClientSessionTask {
  private readonly clientSessionRepo: ClientSessionRepo;

  constructor(clientSessionRepo: ClientSessionRepo) {
    this.clientSessionRepo = clientSessionRepo;
  }

  public execute(
    loginCredentials: LoginIn,
    isGuest: boolean,
    id: number
  ): ResponsePromise<string> {
    return this.clientSessionRepo.insert({
      value: loginCredentialsToClientSessionEntity(
        loginCredentials,
        isGuest,
        generateUuidv4(),
        id
      )
    });
  }
}
