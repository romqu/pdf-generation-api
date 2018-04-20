import { WriteStream } from "fs-extra";

import { FsModeOctal } from "../../constants";
import { Response, ResponsePromise } from "../../domain/model/response";
import { provide } from "../../ioc/ioc";
import { FsDataSource } from "../fsDataSource";

@provide(FileRepo)
  .inSingletonScope()
  .done()
export class FileRepo {
  private readonly fsDataSource: FsDataSource;

  constructor(fsDataSource: FsDataSource) {
    this.fsDataSource = fsDataSource;
  }

  public createFile(
    path: string,
    mode: FsModeOctal.DEFAULT
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
