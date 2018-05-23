import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { provide } from "../../../ioc/ioc";
import { RegistrationIn } from "../../../presentation/model/registrationIn";
import { RegistrationOut } from "../../../presentation/model/registrationOut";
import { callAsync } from "../../../util/failableUtil";
import { loginInToLoginCredentialsEntity } from "../../mapper/modelMapper";
import { ResponsePromise } from "../../model/response";
import { CreateClientSessionTask } from "./createClientSessionTask";
import { CreateClientTask } from "./createClientTask";
import { DoesEmailExistTask } from "./doesEmailExistTask";
import { HashPasswordTask } from "./hashPasswordTask";

@provide(RegistrationManager)
  .inSingletonScope()
  .done()
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

  public execute(
    registrationIn: RegistrationIn
  ): ResponsePromise<RegistrationOut> {
    return callAsync(async ({ failure, success, run }) => {
      const { loginCredentials, client } = registrationIn;

      const doesEmailExist = run(
        await this.doesEmailExistTask.execute(loginCredentials.email)
      );

      if (doesEmailExist) {
        return failure({
          type: "Abort",
          code: 104,
          title: "Email exist",
          message: "Supplied Email already exists",
          stack: ""
        });
      }

      const passwordHash = run(
        await this.hashPasswordTask.execute(loginCredentials.password)
      );

      const loginCredentialsId = run(
        await this.loginCredentialsRepo.insert(
          loginInToLoginCredentialsEntity(loginCredentials, passwordHash)
        )
      );

      const clientId = run(
        await this.createClientTask.execute(client, loginCredentialsId)
      );

      const sessionToken = run(
        await this.createClientSessionTask.execute(
          loginCredentials,
          loginCredentialsId
        )
      );

      return success(
        new RegistrationOut(sessionToken, clientId, loginCredentialsId)
      );
    });
  }
}
