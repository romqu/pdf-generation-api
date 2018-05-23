import { ResponsePromise } from "../../domain/model/response";
import { provide } from "../../ioc/ioc";
import { callAsync } from "../../util/failableUtil";
import { deserializeObject, deserializeData } from "../../util/jsonUtil";
import { DiskDataSource, IReturnedId } from "../diskDataSource";
import { LoginCredentialsEntity } from "./loginCredentialsEntity";
import { logInfo } from "../../util/loggerUtil";

@provide(LoginCredentialsRepo)
  .inSingletonScope()
  .done()
export class LoginCredentialsRepo {
  private readonly diskDataSoruce: DiskDataSource;

  constructor(diskDataSoruce: DiskDataSource) {
    this.diskDataSoruce = diskDataSoruce;
  }

  public insert(
    loginCredentials: LoginCredentialsEntity
  ): ResponsePromise<number> {
    return callAsync(async ({ success, run }) => {
      const result = run(
        await this.diskDataSoruce.queryOne<IReturnedId>(
          "/data/login_credentials/sql/insertOne.sql",
          {
            email: loginCredentials.email,
            passwordHash: loginCredentials.passwordHash
          }
        )
      );

      return success(result.id);
    });
  }

  public doesEmailExist(email: string): ResponsePromise<boolean> {
    return callAsync(async ({ success, run }) => {
      const result = run(
        await this.diskDataSoruce.queryOne<IDoesExists>(
          "/data/login_credentials/sql/doesEmailExist.sql",
          { email }
        )
      );

      return success(result.exists);
    });
  }

  public getByEmail(email: string): ResponsePromise<LoginCredentialsEntity> {
    return callAsync(async ({ success, run }) => {
      const result = run(
        await this.diskDataSoruce.queryOne<any>(
          "/data/login_credentials/sql/getOneByEmail.sql",
          { email }
        )
      );

      const entity = run(
        deserializeData<LoginCredentialsEntity>(result, LoginCredentialsEntity)
      );

      return success(entity);
    });
  }

  public getPasswordHashByEmail(email: string): ResponsePromise<string> {
    return callAsync(async ({ success, run }) => {
      const result = run(
        await this.diskDataSoruce.queryOne<IPasswordHash>(
          "/data/login_credentials/sql/getPasswordHashByEmail.sql",
          { email }
        )
      );

      return success(result.password_hash);
    });
  }
}

interface IDoesExists {
  readonly exists: boolean;
}

interface IPasswordHash {
  readonly password_hash: string;
}
