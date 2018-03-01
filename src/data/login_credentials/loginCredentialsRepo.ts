import { IDatabase, ITask, QueryFile } from "pg-promise";

import { pgDb } from "../../database";
import { logger } from "../../util/loggerUtil";
import { getQueryFile } from "../../util/sqlFileUtil";
import { LoginCredentialsEntity } from "./loginCredentialsEntity";

export class LoginCredentialsRepo {
  private readonly pgDb: IDatabase<any>;

  constructor(pgDbP: IDatabase<any>) {
    this.pgDb = pgDbP;
  }

  public async insert(
    loginCredentials: LoginCredentialsEntity
  ): Promise<number> {
    const queryFile: QueryFile = getQueryFile(
      "/data/login_credentials/sql/insertOne.sql"
    );

    return await this.pgDb.tx<number>(async (t: ITask<number>) => {
      try {
        return await t.oneOrNone(queryFile, {
          email: loginCredentials.email,
          passwordHash: loginCredentials.passwordHash
        });
      } catch (error) {
        logger.error(error);
      }
    });
  }

  public async doesEmailExist(emailP: string): Promise<boolean> {
    const queryFile: QueryFile = getQueryFile(
      "/data/login_credentials/sql/doesEmailExist.sql"
    );

    const { exists } = await pgDb.one(queryFile, { email: emailP });

    return exists;
  }
}
