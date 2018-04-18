import { ClientRepo } from "../../../data/client/clienRepo";
import { CreateFullDefectListRepo } from "../../../data/create_full_defect_list/createFullDefectListRepo";
import { DefectImageEntity } from "../../../data/create_full_defect_list/defectImageEntity";
import { DirectoryRepo } from "../../../data/directory/directoryRepo";
import { provide } from "../../../ioc/ioc";
import { callAsync } from "../../../util/failableUtil";
import { getSha256Hash } from "../../../util/hashUtil";
import { DefectList } from "../../model/document/defectList";
import { ResponsePromise } from "../../model/response";
import { CreateDefectImageEntityListTask } from "./createDefectImageEntityListTask";
import { TransformToDefectListEntityTask } from "./transformToDefectListEntityTask";

@provide(CreateDefectListManager)
  .inSingletonScope()
  .done()
export class CreateDefectListManager {
  private readonly clientRepo: ClientRepo;
  private readonly createDefectImageEntityListTask: CreateDefectImageEntityListTask;
  private readonly directoryRepo: DirectoryRepo;
  private readonly createFullDefectListRepo: CreateFullDefectListRepo;
  private readonly transformToDefectListEntityTask: TransformToDefectListEntityTask;

  constructor(
    clientRepo: ClientRepo,
    createDefectImageEntityListTask: CreateDefectImageEntityListTask,
    transformToDefectListEntityTask: TransformToDefectListEntityTask,
    directoryRepo: DirectoryRepo,
    createFullDefectListRepo: CreateFullDefectListRepo
  ) {
    this.clientRepo = clientRepo;
    this.createDefectImageEntityListTask = createDefectImageEntityListTask;
    this.transformToDefectListEntityTask = transformToDefectListEntityTask;
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
                run(
                  this.createDefectImageEntityListTask.execute(
                    defect.defectImageList
                  )
                )
              );
            })
          )
        )
      );

      const folderHashName = getSha256Hash();

      const defectEntityList = run(
        this.transformToDefectListEntityTask.execute(
          defectList,
          folderHashName,
          allDefectImagesEntityListMap
        )
      );

      // console.log("HERE", defectEntityList);

      const defectListEntityId = run(
        await this.createFullDefectListRepo.insert(defectEntityList)
      );

      // create directories: list + image

      return success(1);
    });
  }
}
