import { ResponsePromise } from "../../domain/model/response";
import { callAsync } from "../../util/failableUtil";
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
    return callAsync<number>(async ({ success, run }) => {
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
    return callAsync<boolean>(async ({ success, run }) => {
      const result = run<IDoesExists>(
        await this.diskDataSoruce.queryOne<IDoesExists>(
          "/data/login_credentials/sql/doesEmailExist.sql",
          { email }
        )
      );

      return success(result.exists);
    });
  }
}

interface IDoesExists {
  readonly exists: boolean;
}
