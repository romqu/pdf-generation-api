import { ClientRepo } from "../../../data/client/clienRepo";
import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { provide } from "../../../ioc/ioc";
import { LoginModel } from "../../../presentation/model/loginModel";
import { callAsync, matchResponse } from "../../../util/failableUtil";
import { verifyValueArgon2 } from "../../../util/hashUtil";
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
      const loginCredentialsEntityResponse = await this.loginCredentialsRepo.getByEmail(
        loginCredentials.email
      );

      const loginCredentialsEntity = matchResponse(
        loginCredentialsEntityResponse,
        data => data,
        _ => null
      );

      if (loginCredentialsEntity === null) {
        return failure({
          type: "login",
          code: 106,
          title: "login error",
          message: "email does not exist",
          stack: ""
        });
      }

      const isPasswordValid = run(
        await verifyValueArgon2(
          loginCredentialsEntity.passwordHash,
          loginCredentials.password
        )
      );

      if (isPasswordValid) {
        const sessionUuid = run(
          await this.createClientSessionTask.execute(
            loginCredentials,
            loginCredentialsEntity.id
          )
        );

        const client = run(
          await this.clientRepo.getByLoginCredentialsId(
            loginCredentialsEntity.id
          )
        );

        return success(
          new LoginModel(
            sessionUuid,
            client.id,
            loginCredentialsEntity.id,
            client.forename,
            client.surname
          )
        );
      }

      return failure({
        type: "login",
        code: 107,
        title: "login error",
        message: "password is invalid",
        stack: ""
      });
    });
  }
}
