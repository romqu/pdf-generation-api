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
  ): ResponsePromise<string> {
    return callAsync(async ({ success, run }) => {
      const folderPathToCreate = defectListName
        .slice(0, 4)
        .split("")
        .map(char => char + "/")
        .join("")
        .replace(/^/, Folder.UPLOAD_FOLDER_BASE_PATH);

      const folderPathWithImagesFolder = folderPathToCreate.concat(
        defectListName,
        Folder.IMAGES_FOLDER_NAME
      );

      run(await this.directoryRepo.createDirectory(folderPathWithImagesFolder));
      run(await this.directoryRepo.changeMode(folderPathWithImagesFolder));

      return success(folderPathToCreate);
    });
  }
}
