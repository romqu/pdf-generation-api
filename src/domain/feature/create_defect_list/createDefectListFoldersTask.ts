import "reflect-metadata";

import { UPLOAD_FOLDER_BASE_PATH } from "../../../constants";
import { DirectoryRepo } from "../../../data/directory/directoryRepo";
import { provide } from "../../../ioc/ioc";
import { callAsync } from "../../../util/failableUtil";
import { logInfo } from "../../../util/loggerUtil";
import { ResponsePromise } from "../../model/response";

@provide(CreateDefectListFoldersTask)
  .inSingletonScope()
  .done()
export class CreateDefectListFoldersTask {
  private directoryRepo: DirectoryRepo;

  constructor(directoryRepo: DirectoryRepo) {
    this.directoryRepo = directoryRepo;
  }

  public execute(
    defectListName: string,
    defectImageNamesList: string[]
  ): ResponsePromise<string> {
    return callAsync(async ({ success, run }) => {
      const folderPathToCreate = defectListName
        .slice(0, 4)
        .split("")
        .map(char => char + "/")
        .join("")
        .concat(defectListName, "/images")
        .replace(/^/, UPLOAD_FOLDER_BASE_PATH);

      run(await this.directoryRepo.createDirectory(folderPathToCreate));
      run(await this.directoryRepo.changeMode(folderPathToCreate));

      logInfo("folderPathToCreate", folderPathToCreate);

      return success("");
    });
  }
}
