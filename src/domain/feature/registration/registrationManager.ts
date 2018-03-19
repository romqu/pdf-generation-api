import { ErrorTag } from "../../../constants";
import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { callAsync } from "../../../util/failableUtil";
import { loginCredentialsToLoginCredentialsEntity } from "../../mapper/modelMapper";
import { RegistrationData } from "../../model/registrationData";
import { ResponsePromise } from "../../model/response";
import { CreateClientSessionTask } from "./createClientSessionTask";
import { CreateClientTask } from "./createClientTask";
import { DoesEmailExistTask } from "./doesEmailExistTask";
import { HashPasswordTask } from "./hashPasswordTask";

export class RegistrationManager {
  private readonly doesEmailExistTask: DoesEmailExistTask;
  private readonly hashPasswordTask: HashPasswordTask;
  private readonly createClientTask: CreateClientTask;
  private readonly createClientSessionTask: CreateClientSessionTask;
  private readonly loginCredentialsRepo: LoginCredentialsRepo;

  constructor(
    doesEmailExistTask: DoesEmailExistTask,
    hashPasswordTask: HashPasswordTask,
    createClientTask: CreateClientTask,
    createClientSessionTask: CreateClientSessionTask,
    loginCredentialsRepo: LoginCredentialsRepo
  ) {
    this.doesEmailExistTask = doesEmailExistTask;
    this.hashPasswordTask = hashPasswordTask;
    this.createClientTask = createClientTask;
    this.createClientSessionTask = createClientSessionTask;
    this.loginCredentialsRepo = loginCredentialsRepo;
  }

  public execute(registrationData: RegistrationData): ResponsePromise<string> {
    return callAsync(async ({ failure, success, run }) => {
      const loginCredentials = registrationData.loginCredentials;

      const client = registrationData.client;

      const doesEmailExist = run(
        await this.doesEmailExistTask.execute(loginCredentials.email)
      );

      if (doesEmailExist) {
        return failure(ErrorTag.EMAIL_EXISTS, "Email exists");
      }

      const passwordHash = run(
        await this.hashPasswordTask.execute(loginCredentials.password)
      );

      const loginCredentialsId = run(
        await this.loginCredentialsRepo.insert(
          loginCredentialsToLoginCredentialsEntity(
            loginCredentials,
            passwordHash
          )
        )
      );

      run(await this.createClientTask.execute(client, loginCredentialsId));

      const result = run(
        await this.createClientSessionTask.execute(
          loginCredentials,
          loginCredentialsId
        )
      );

      return success(result);
    });
  }
}
