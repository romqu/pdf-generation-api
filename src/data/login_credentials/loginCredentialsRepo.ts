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

export class LoginCredentialsRepo {
  private readonly pgDb: IDatabase<any>;

  constructor(pgDbP: IDatabase<any>) {
    this.pgDb = pgDbP;
  }

  public async insert(
    loginCredentials: LoginCredentialsEntity
  ): Promise<Response<number>> {
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

      const result = await run<any>(
        await failable<any>(() => pgDb.one(queryFile, { email: 1 }))
      );

      return success(result);
    });
  }
}
