import { FileRepo } from "../../../data/file/fileRepo";
import { provide } from "../../../ioc/ioc";
import { call } from "../../../util/failableUtil";
import { Response } from "../../model/response";

@provide(CreatePdfFileTask)
  .inSingletonScope()
  .done()
export class CreatePdfFileTask {
  private readonly fileRepo: FileRepo;

  constructor(fileRepo: FileRepo) {
    this.fileRepo = fileRepo;
  }

  public execute(
    basePath: string,
    pdfName: string,
    pdfKitDocument: any
  ): Response<boolean> {
    return call(({ success, run }) => {
      pdfKitDocument.pipe(run(this.fileRepo.createFile(basePath + pdfName)));

      pdfKitDocument.end();

      return success(true);
    });
  }
}
