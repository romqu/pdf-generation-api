import { ClientRepo } from "../../../data/client/clienRepo";
import { DirectoryRepo } from "../../../data/directory/directoryRepo";
import { callAsync } from "../../../util/failableUtil";
import { getSha256Hash } from "../../../util/hashUtil";
import { DefectList } from "../../model/document/defectList";
import { ResponsePromise } from "../../model/response";

export class CreateDefectListManager {
  private readonly clientRepo: ClientRepo;
  private readonly directoryRepo: DirectoryRepo;

  constructor(clientRepo: ClientRepo, directoryRepo: DirectoryRepo) {
    this.clientRepo = clientRepo;
    this.directoryRepo = directoryRepo;
  }

  public execute(defectList: DefectList): ResponsePromise<number> {
    return callAsync(async ({ success, run, failure }) => {
      const client = run(
        await this.clientRepo.getForAndSurnameById(defectList.creator.clientId)
      );

      const folderHashName = getSha256Hash();

      return success(1);
    });

    // get client by id
    // generate hash for has for project folder
    // create project folder with hash as name and 4 as depth ==> /4/b/2/e/4b2e8280bf0693343a0dd18c41aa49f182e2337f85ea73b65e43bc53b5d01fe1
    // create images folder inside hash folder
    // create entity and save into db
    // return defect list id
  }
}
