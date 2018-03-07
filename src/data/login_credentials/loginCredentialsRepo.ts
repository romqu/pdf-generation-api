import { IDatabase, ITask, QueryFile } from "pg-promise";

import { pgDb } from "../../database";
import { Response } from "../../domain/model/response";
import {
  callAsync,
  failableAsync,
  makeSuccessResponse
} from "../../util/failableUtil";
import { getQueryFile } from "../../util/sqlFileUtil";
import { LoginCredentialsEntity } from "./loginCredentialsEntity";
import { failable } from "../../util/failableUtil";

export class LoginCredentialsRepo {
  private readonly pgDb: IDatabase<any>;

  constructor(pgDbP: IDatabase<any>) {
    this.pgDb = pgDbP;
  }

  public async insert(
    loginCredentials: LoginCredentialsEntity
  ): Promise<Response<number>> {
    return callAsync<number>(async ({ failable }) => {});
    const queryFile: QueryFile = getQueryFile(
      "/data/login_credentials/sql/insertOne.sql"
    );

    return failableAsync<number>(() =>
      this.pgDb.tx<number>(async (t: ITask<number>) => {
        const result = await t.one(queryFile, {
          email: loginCredentials.email,
          passwordHash: loginCredentials.passwordHash
        });

        return result.isSuccess ? makeSuccessResponse(result.data.id) : result;
      })
    );
  }

  public async doesEmailExist(emailP: string): Promise<Response<boolean>> {
    return callAsync<boolean>(async ({ success, failable, run }) => {
      const queryFile: QueryFile = getQueryFile(
        "/data/login_credentials/sql/doesEmailExist.sql"
      );

      const result = await run<IDoesExists>(
        await failable<any>(() => pgDb.one(queryFile, { email: emailP }))
      );

      return success(result.exists);
    });
  }
}

interface IDoesExists {
  readonly exists: boolean;
}
