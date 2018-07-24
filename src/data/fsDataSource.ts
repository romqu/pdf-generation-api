import "reflect-metadata";

import * as fs from "fs-extra";

import { provideSingleton } from "../core/ioc/ioc";
import { Response, ResponsePromise } from "../domain/model/response";
import { failable, failableAsync } from "../util/failableUtil";

@provideSingleton(FsDataSource)
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

  // 0o600
  public chmod(path: string, mode: number): ResponsePromise<void> {
    return failableAsync(
      { type: "FileSystem", code: 202, title: "chmod error" },
      () => fs.chmod(path, mode)
    );
  }

  public createWriteStream(
    path: string,
    mode: number
  ): Response<fs.WriteStream> {
    return failable(
      { type: "FileSystem", code: 203, title: "write stream error" },
      () => fs.createWriteStream(path, { mode })
    );
  }
}
