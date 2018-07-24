import "reflect-metadata";

import { Folder } from "../../../constants";
import { provideSingleton } from "../../../core/ioc/ioc";
import { DirectoryRepo } from "../../../data/directory/directoryRepo";
import { callAsync } from "../../../util/failableUtil";
import { ResponsePromise } from "../../model/response";

@provideSingleton(CreateDefectListFoldersTask)
export class CreateDefectListFoldersTask {
  private directoryRepo: DirectoryRepo;

  constructor(directoryRepo: DirectoryRepo) {
    this.directoryRepo = directoryRepo;
  }

  public execute(
    defectListName: string,
    /* defectImageNamesList*/ _: string[]
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
