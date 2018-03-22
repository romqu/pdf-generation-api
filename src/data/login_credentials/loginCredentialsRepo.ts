import { ResponsePromise } from "../../domain/model/response";
import { callAsync } from "../../util/failableUtil";
import { deserializeObject } from "../../util/jsonUtil";
import { DiskDataSource, IReturnedId } from "../diskDataSource";
import { LoginCredentialsEntity } from "./loginCredentialsEntity";

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
        deserializeObject<LoginCredentialsEntity>(
          result,
          LoginCredentialsEntity
        )
      );

      return success(entity);
    });
  }
}

interface IDoesExists {
  readonly exists: boolean;
}
