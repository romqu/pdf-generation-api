import { ClientSessionRepo } from "../../../data/client_session/clientSessionRepo";
import { LoginCredentialsEntity } from "../../../data/login_credentials/loginCredentialsEntity";
import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { callAsync } from "../../../util/failableUtil";
import { generateUuidv4 } from "../../../util/uuidv4Util";
import { LoginCredentials } from "../../model/loginCredentials";
import { Response } from "../../model/response";
import { HashPasswordTask } from "./hashPasswordTask";
import { ClientSessionEntity } from "../../../data/client_session/clientSessionEntity";

export class RegistrationManager {
  private readonly hashPasswordTask: HashPasswordTask;
  private readonly loginCredentialsRepo: LoginCredentialsRepo;
  private readonly clientSessionRepo: ClientSessionRepo;

  constructor(
    hashPasswordTask: HashPasswordTask,
    loginCredentialsRepo: LoginCredentialsRepo,
    clientSessionRepo: ClientSessionRepo
  ) {
    this.hashPasswordTask = hashPasswordTask;
    this.loginCredentialsRepo = loginCredentialsRepo;
    this.clientSessionRepo = clientSessionRepo;
  }

  public async execute(
    loginCredentials: LoginCredentials
  ): Promise<Response<number>> {
    return callAsync<number>(async ({ failure, success, run }) => {
      const doesEmailExist = await run(
        await this.loginCredentialsRepo.doesEmailExist(loginCredentials.email)
      );

      if (doesEmailExist) {
        return failure("Email exists");
      }

      const passwordHashV = await run(
        await this.hashPasswordTask.execute(loginCredentials.password)
      );

      const loginCredentialsId = await run(
        await this.loginCredentialsRepo.insert(
          new LoginCredentialsEntity({
            id: 0,
            email: loginCredentials.email,
            passwordHash: passwordHashV
          })
        )
      );

      this.clientSessionRepo.insert({
        value: new ClientSessionEntity(
          generateUuidv4(),
          loginCredentialsId,
          loginCredentials.email
        )
      });

      return success(loginCredentialsId);
    });
  }
}
