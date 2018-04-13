import { ResponsePromise } from "../../domain/model/response";
import { FsDataSource } from "../fsDataSource";

export class DirectoryRepo {
  private readonly fsDataSource: FsDataSource;

  constructor(fsDataSource: FsDataSource) {
    this.fsDataSource = fsDataSource;
  }

  public createDirectory(path: string): ResponsePromise<void> {
    return this.fsDataSource.createDir(path);
  }

  public changeMode(path: string): ResponsePromise<void> {
    return this.fsDataSource.chmod(path);
  }
}
