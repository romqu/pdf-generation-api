import { LoginCredentialsEntity } from "../../../data/login_credentials/loginCredentialsEntity";
import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { callAsync } from "../../../util/failableUtil";
import { LoginCredentials } from "../../model/loginCredentials";
import { Response } from "../../model/response";
import { HashPasswordTask } from "./hashPasswordTask";

export class RegistrationManager {
  private readonly hashPasswordTask: HashPasswordTask;
  private readonly loginCredentialsRepo: LoginCredentialsRepo;

  constructor(
    hashPasswordTask: HashPasswordTask,
    loginCredentialsRepo: LoginCredentialsRepo
  ) {
    this.hashPasswordTask = hashPasswordTask;
    this.loginCredentialsRepo = loginCredentialsRepo;
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

      const result = await run(
        await this.loginCredentialsRepo.insert(
          new LoginCredentialsEntity({
            id: 0,
            email: loginCredentials.email,
            passwordHash: passwordHashV
          })
        )
      );

      return success(result);
    });
  }
}
