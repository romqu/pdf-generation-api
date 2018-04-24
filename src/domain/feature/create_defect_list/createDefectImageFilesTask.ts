import { FileRepo } from "../../../data/file/fileRepo";
import { provide } from "../../../ioc/ioc";
import { call } from "../../../util/failableUtil";
import { Response } from "../../model/response";

@provide(CreateDefectImageFilesTask)
  .inSingletonScope()
  .done()
export class CreateDefectImageFilesTask {
  private readonly fileRepo: FileRepo;

  constructor(fileRepo: FileRepo) {
    this.fileRepo = fileRepo;
  }

  public execute(
    basePath: string,
    imageName: string,
    part: any
  ): Response<boolean> {
    return call(({ success, run }) => {
      part.pipe(run(this.fileRepo.createFile(basePath + imageName)));

      return success(true);
    });
  }
}
