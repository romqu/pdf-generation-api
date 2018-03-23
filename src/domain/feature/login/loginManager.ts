import { LoginCredentialsRepo } from "../../../data/login_credentials/loginCredentialsRepo";
import { verifyValue } from "../../../util/argon2Util";
import { callAsync } from "../../../util/failableUtil";
import { LoginCredentials } from "../../model/loginCredentials";
import { ResponsePromise } from "../../model/response";
import { CreateClientSessionTask } from "../registration/createClientSessionTask";

export class LoginManager {
  private readonly loginCredentialsRepo: LoginCredentialsRepo;
  private readonly createClientSessionTask: CreateClientSessionTask;

  constructor(
    loginCredentialsRepo: LoginCredentialsRepo,
    createClientSessionTask: CreateClientSessionTask
  ) {
    this.loginCredentialsRepo = loginCredentialsRepo;
    this.createClientSessionTask = createClientSessionTask;
  }

  public execute(loginCredentials: LoginCredentials): ResponsePromise<boolean> {
    return callAsync(async ({ success, run }) => {
      const loginEntity = run(
        await this.loginCredentialsRepo.getByEmail(loginCredentials.email)
      );

      const isValid = run(
        await verifyValue(loginEntity.passwordHash, loginCredentials.password)
      );

      if (isValid) {
        const sessionUuid = run(
          await this.createClientSessionTask.execute(
            loginCredentials,
            loginEntity.id
          )
        );
      }

      return success(true);
    });
    // get password hash from db
    // verify password
    // if (true)
    //      insert client session into mDb, return session uuid
    //      get client from dDb <----
    //      return loginModel (sessionUuid, client)
    // else
    //      return error
  }
}
