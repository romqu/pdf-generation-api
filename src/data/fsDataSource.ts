import * as fs from "fs-extra";

import { ResponsePromise } from "../domain/model/response";
import { callAsync } from "../util/failableUtil";

export class FsDataSource {
  createDir(path: string): ResponsePromise<string> {
    fs.mkdirp("");
    fs.chown("");

    return callAsync(async ({ success, run, failable }) => {
      const result = run(await failable());
      return success("");
    });
  }
}
