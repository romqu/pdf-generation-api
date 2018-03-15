import { IDatabase, ITask, QueryFile } from "pg-promise";

import { ErrorTags } from "../constants";
import { ResponsePromise } from "../domain/model/response";
import { callAsync } from "../util/failableUtil";
import { getQueryFile } from "../util/sqlFileUtil";

export class DiskDataSource {
  private readonly pgDb: IDatabase<any>;

  constructor(pgDb: IDatabase<any>) {
    this.pgDb = pgDb;
  }

  public queryOne<T>(queryFilePath: string, data: object): ResponsePromise<T> {
    return callAsync<T>(async ({ success, run, failable }) => {
      const queryFile = getQueryFile(queryFilePath);

      const result = run(
        await failable(ErrorTags.DB, () =>
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
