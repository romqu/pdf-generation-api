import { ClientRepo } from "../../../data/client/clienRepo";
import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { provide } from "../../../ioc/ioc";
import { LoginModel } from "../../../presentation/model/loginModel";
import { verifyValue } from "../../../util/argon2Util";
import { callAsync } from "../../../util/failableUtil";
import { LoginCredentials } from "../../model/loginCredentials";
import { ResponsePromise } from "../../model/response";
import { CreateClientSessionTask } from "../registration/createClientSessionTask";

@provide(LoginManager)
  .inSingletonScope()
  .done()
export class LoginManager {
  private readonly loginCredentialsRepo: LoginCredentialsRepo;
  private readonly clientRepo: ClientRepo;
  private readonly createClientSessionTask: CreateClientSessionTask;

  constructor(
    loginCredentialsRepo: LoginCredentialsRepo,
    createClientSessionTask: CreateClientSessionTask,
    clientRepo: ClientRepo
  ) {
    this.loginCredentialsRepo = loginCredentialsRepo;
    this.createClientSessionTask = createClientSessionTask;
    this.clientRepo = clientRepo;
  }

  public execute(
    loginCredentials: LoginCredentials
  ): ResponsePromise<LoginModel> {
    return callAsync(async ({ success, run, failure }) => {
      const loginEntity = run(
        await this.loginCredentialsRepo.getByEmail(loginCredentials.email)
      );

      const isValid = run(
        await verifyValue(loginEntity.passwordHash, loginCredentials.password)
      );

      if (!isValid) {
        return failure({
          type: "login",
          code: 106,
          title: "login error",
          message: "password is invalid",
          stack: ""
        });
      }

      const sessionUuid = run(
        await this.createClientSessionTask.execute(
          loginCredentials,
          loginEntity.id
        )
      );

      const client = run(
        await this.clientRepo.getByLoginCredentialsId(loginEntity.id)
      );

      return success(
        new LoginModel(sessionUuid, client.forename, client.surname)
      );
    });
  }
}
