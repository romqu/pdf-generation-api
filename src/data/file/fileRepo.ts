import "reflect-metadata";

import { WriteStream } from "fs-extra";

import { FsModeOctal } from "../../constants";
import { provideSingleton } from "../../core/ioc/ioc";
import { Response, ResponsePromise } from "../../domain/model/response";
import { FsDataSource } from "../fsDataSource";

@provideSingleton(FileRepo)
export class FileRepo {
  private readonly fsDataSource: FsDataSource;

  constructor(fsDataSource: FsDataSource) {
    this.fsDataSource = fsDataSource;
  }

  public createFile(
    path: string,
    mode: number = FsModeOctal.DEFAULT
  ): Response<WriteStream> {
    return this.fsDataSource.createWriteStream(path, mode);
  }

  public changeMode(
    path: string,
    mode: number = FsModeOctal.DEFAULT
  ): ResponsePromise<void> {
    return this.fsDataSource.chmod(path, mode);
  }
}
