import "reflect-metadata";

import { Folder } from "../../../constants";
import { DirectoryRepo } from "../../../data/directory/directoryRepo";
import { provide } from "../../../ioc/ioc";
import { callAsync } from "../../../util/failableUtil";
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
  ): ResponsePromise<void> {
    return callAsync(async ({ success, run }) => {
      const folderPathToCreate = defectListName
        .slice(0, 4)
        .split("")
        .map(char => char + "/")
        .join("")
        .concat(defectListName, Folder.IMAGES_FOLDER_NAME)
        .replace(/^/, Folder.UPLOAD_FOLDER_BASE_PATH);

      run(await this.directoryRepo.createDirectory(folderPathToCreate));

      return success(
        run(await this.directoryRepo.changeMode(folderPathToCreate))
      );
    });
  }
}
