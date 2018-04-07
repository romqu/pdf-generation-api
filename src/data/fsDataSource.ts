import * as fs from "fs-extra";

import { ResponsePromise } from "../domain/model/response";
import { failableAsync } from "../util/failableUtil";

export class FsDataSource {
  public createDir(path: string): ResponsePromise<void> {
    return failableAsync(
      { type: "FileSystem", code: 200, title: "create dir error" },
      () => fs.mkdirp(path)
    );
  }

  public remove(path: string): ResponsePromise<void> {
    return failableAsync(
      { type: "FileSystem", code: 201, title: "delete file error" },
      () => fs.remove(path)
    );
  }

  // 0o750
  public chmod(path: string, mode: number = 0o750): ResponsePromise<void> {
    return failableAsync(
      { type: "FileSystem", code: 202, title: "chmod error" },
      () => fs.chmod(path, mode)
    );
  }
}
