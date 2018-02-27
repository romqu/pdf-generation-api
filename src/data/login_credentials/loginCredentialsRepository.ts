import { IDatabase, ITask, QueryFile } from "pg-promise";

import { getQueryFile } from "../../util/helper";
import { logger } from "../../util/logger";
import { LoginCredentialsEntity } from "./loginCredentialsEntity";

export class LoginCredentialsRepository {
  private readonly pgDb: IDatabase<any>;

  constructor(pgDbP: IDatabase<any>) {
    this.pgDb = pgDbP;
  }

  public async insert(
    loginCredentials: LoginCredentialsEntity
  ): Promise<number> {
    const query: QueryFile = getQueryFile(
      "/data/login_credentials/sql/insertOne.sql"
    );

    return await this.pgDb.tx<number>(async (t: ITask<number>) => {
      try {
        return await t.oneOrNone(query, {
          email: loginCredentials.email,
          passwordHash: loginCredentials.passwordHash
        });
      } catch (error) {
        logger.error(error);
      }
    });
  }
}
