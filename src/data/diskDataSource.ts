import "reflect-metadata";

import { inject } from "inversify";
import { IDatabase, ITask } from "pg-promise";

import { ResponsePromise } from "../domain/model/response";
import { provide } from "../ioc/ioc";
import { TYPES } from "../ioc/types";
import { callAsync } from "../util/failableUtil";
import { getQueryFile } from "../util/sqlFileUtil";

@provide(DiskDataSource)
  .inSingletonScope()
  .done()
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
}
