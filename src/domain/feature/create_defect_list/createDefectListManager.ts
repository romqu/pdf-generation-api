import { ClientRepo } from "../../../data/client/clienRepo";
import { CreateFullDefectListRepo } from "../../../data/create_full_defect_list/createFullDefectListRepo";
import { DefectImageEntity } from "../../../data/create_full_defect_list/defectImageEntity";
import { DirectoryRepo } from "../../../data/directory/directoryRepo";
import { callAsync } from "../../../util/failableUtil";
import { getSha256Hash } from "../../../util/hashUtil";
import { DefectList } from "../../model/document/defectList";
import { ResponsePromise } from "../../model/response";
import { CreateDefectImageEntityListTask } from "./createDefectImageEntityListTask";

export class CreateDefectListManager {
  private readonly clientRepo: ClientRepo;
  private readonly createDefectImageEntityListTask: CreateDefectImageEntityListTask;
  private readonly directoryRepo: DirectoryRepo;
  private readonly createFullDefectListRepo: CreateFullDefectListRepo;

  constructor(
    clientRepo: ClientRepo,
    createDefectImageEntityListTask: CreateDefectImageEntityListTask,
    directoryRepo: DirectoryRepo,
    createFullDefectListRepo: CreateFullDefectListRepo
  ) {
    this.clientRepo = clientRepo;
    this.createDefectImageEntityListTask = createDefectImageEntityListTask;
    this.directoryRepo = directoryRepo;
    this.createFullDefectListRepo = createFullDefectListRepo;
  }

  public execute(defectList: DefectList): ResponsePromise<number> {
    return callAsync(async ({ success, run, failure }) => {
      const client = run(
        await this.clientRepo.getForAndSurnameById(defectList.creator.clientId)
      );

      const allDefectImagesEntityListMap: Map<
        number,
        DefectImageEntity[]
      > = new Map();

      defectList.streetAddress.floorList.forEach(floor =>
        floor.livingUnitList.forEach(livingUnit =>
          livingUnit.roomList.forEach(room =>
            room.defectList.forEach(defect => {
              allDefectImagesEntityListMap.set(
                allDefectImagesEntityListMap.size,
                this.createDefectImageEntityListTask.execute(
                  defect.defectImageList
                )
              );
            })
          )
        )
      );

      const folderHashName = getSha256Hash();

      // transform into DefecListEntity
      // save into db
      // create directories: list + image

      return success(1);
    });
  }
}
