import { QueryFile } from "pg-promise";

import { pgDb } from "../../database";
import { ResponsePromise } from "../../domain/model/response";
import { callAsync } from "../../util/failableUtil";
import { getQueryFile } from "../../util/sqlFileUtil";
import { DiskDataSource } from "../diskDataSource";
import { LoginCredentialsEntity } from "./loginCredentialsEntity";

export class LoginCredentialsRepo {
  private readonly diskDataSoruce: DiskDataSource;

  constructor(diskDataSoruce: DiskDataSource) {
    this.diskDataSoruce = diskDataSoruce;
  }

  public async insert(
    loginCredentials: LoginCredentialsEntity
  ): ResponsePromise<number> {
    return callAsync<number>(async ({ success, run }) => {
      const result = run(
        await this.diskDataSoruce.queryOne<number>(
          "/data/login_credentials/sql/insertOne.sql",
          {
            email: loginCredentials.email,
            passwordHash: loginCredentials.passwordHash
          }
        )
      );

      return success(result);
    });
  }

  public async doesEmailExist(
    emailP: string
  ): ResponsePromise<boolean, DBError> {
    return callAsyncTwo<boolean, DBError>(
      async ({ success, failable, run }) => {
        const queryFile: QueryFile = getQueryFile(
          "/data/login_credentials/sql/doesEmailExist.sql"
        );

        const result = run<IDoesExists>(
          await failable<any>(() => pgDb.one(queryFile, { email: emailP }))
        );

        return success(result.exists);
      }
    );
  }
}

interface IDoesExists {
  readonly exists: boolean;
}
