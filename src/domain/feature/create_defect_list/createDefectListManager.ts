import { ClientRepo } from "../../../data/client/clienRepo";
import { callAsync } from "../../../util/failableUtil";
import { getSha256Hash } from "../../../util/hashUtil";
import { ResponsePromise } from "../../model/response";

export class CreateDefectListManager {
  private readonly clientRepo: ClientRepo;

  constructor(clientRepo: ClientRepo) {
    this.clientRepo = clientRepo;
  }

  public execute(): ResponsePromise<number> {
    return callAsync(async ({ success, run, failure }) => {
      const client = run(await this.clientRepo.getForAndSurnameById(1));

      const folderHashName = getSha256Hash();

      return success(1);
    });

    // get client by id
    // generate hash for folder
    // create folder with hash as name and 4 as depth ==> /4/b/2/e/4b2e8280bf0693343a0dd18c41aa49f182e2337f85ea73b65e43bc53b5d01fe1
    // create images folder inside hash folder
    // create entity and save into db
    // return defect list id
  }
}
