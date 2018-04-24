import { ClientRepo } from "../../../data/client/clienRepo";
import { CreateFullDefectListRepo } from "../../../data/create_full_defect_list/createFullDefectListRepo";
import { DefectImageEntity } from "../../../data/create_full_defect_list/defectImageEntity";
import { provide } from "../../../ioc/ioc";
import { callAsync } from "../../../util/failableUtil";
import { getSha256Hash } from "../../../util/hashUtil";
import { DefectList } from "../../model/document/defectList";
import { ResponsePromise } from "../../model/response";
import { CreateDefectImageEntityListTask } from "./createDefectImageEntityListTask";
import { CreateDefectListFoldersTask } from "./createDefectListFoldersTask";
import { TransformToDefectListEntityTask } from "./transformToDefectListEntityTask";

@provide(CreateDefectListManager)
  .inSingletonScope()
  .done()
export class CreateDefectListManager {
  private readonly clientRepo: ClientRepo;
  private readonly createDefectImageEntityListTask: CreateDefectImageEntityListTask;
  private readonly createFullDefectListRepo: CreateFullDefectListRepo;
  private readonly createDefectListFoldersTask: CreateDefectListFoldersTask;
  private readonly transformToDefectListEntityTask: TransformToDefectListEntityTask;

  constructor(
    clientRepo: ClientRepo,
    createDefectImageEntityListTask: CreateDefectImageEntityListTask,
    transformToDefectListEntityTask: TransformToDefectListEntityTask,
    createDefectListFoldersTask: CreateDefectListFoldersTask,
    createFullDefectListRepo: CreateFullDefectListRepo
  ) {
    this.clientRepo = clientRepo;
    this.createDefectImageEntityListTask = createDefectImageEntityListTask;
    this.transformToDefectListEntityTask = transformToDefectListEntityTask;
    this.createDefectListFoldersTask = createDefectListFoldersTask;
    this.createFullDefectListRepo = createFullDefectListRepo;
  }

  public execute(
    defectList: DefectList
  ): ResponsePromise<ICreateDefectListResponse> {
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

      const allDefectImageNamesMap: Map<string, string> = new Map();

      allDefectImagesEntityListMap.forEach(defectImageEntityList =>
        defectImageEntityList.forEach(defectImageEntity =>
          allDefectImageNamesMap.set(
            defectImageEntity.originalName,
            defectImageEntity.name
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

      const defectListEntityId = run(
        await this.createFullDefectListRepo.insert(defectEntityList)
      );

      const folderPath = run(
        await this.createDefectListFoldersTask.execute(folderHashName, [])
      );

      return success({
        allDefectImageNamesMap,
        defectListFolderName: folderPath
      });
    });
  }
}

export interface ICreateDefectListResponse {
  readonly allDefectImageNamesMap: Map<string, string>;
  readonly defectListFolderName: string;
}
