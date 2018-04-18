import { ResponsePromise } from "../../domain/model/response";
import { provide } from "../../ioc/ioc";
import { FsDataSource } from "../fsDataSource";

@provide(DirectoryRepo)
  .inSingletonScope()
  .done()
export class DirectoryRepo {
  private readonly fsDataSource: FsDataSource;

  constructor(fsDataSource: FsDataSource) {
    this.fsDataSource = fsDataSource;
  }

  public createDirectory(path: string): ResponsePromise<void> {
    return this.fsDataSource.createDir(path);
  }

  public changeMode(path: string, mode: number = 0o600): ResponsePromise<void> {
    return this.fsDataSource.chmod(path, mode);
  }
}
