import { FileRepo } from "../../../data/file/fileRepo";
import { provide } from "../../../ioc/ioc";

@provide(CreateDefectImageFilesTask)
  .inSingletonScope()
  .done()
export class CreateDefectImageFilesTask {
  private readonly fileRepo: FileRepo;

  constructor(fileRepo: FileRepo) {
    this.fileRepo = fileRepo;
  }

  public execute(): void {}
}
