import { inject, injectable } from "inversify";
import { IDatabase, ITask } from "pg-promise";

import { ResponsePromise } from "../domain/model/response";
import { TYPES } from "../ioc/types";
import { callAsync } from "../util/failableUtil";
import { getQueryFile } from "../util/sqlFileUtil";

import "reflect-metadata";
import { logger } from "../util/loggerUtil";

@injectable()
export class DiskDataSource {
  private readonly pgDb: IDatabase<any>;

  constructor(@inject(TYPES.PgpDb) pgDb: IDatabase<any>) {
    this.pgDb = pgDb;
  }

  public queryOne<T>(queryFilePath: string, data: object): ResponsePromise<T> {
    return callAsync<T>(async ({ success, run, failable }) => {
      const queryFile = getQueryFile(queryFilePath);

      const result = run(
        await failable({ type: "DB", code: 100, title: "Query Error" }, () =>
          this.pgDb.tx<T>(async (t: ITask<T>) => {
            const queryResult = await t.one(queryFile, data);

            return queryResult;
          })
        )
      );

      return success(result);
    });
  }

  public test(): void {
    logger.info("Test", this.pgDb.$config);
  }
}

export interface IReturnedId {
  id: number;
}
