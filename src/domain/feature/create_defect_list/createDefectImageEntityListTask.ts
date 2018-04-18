import { DefectImageEntity } from "../../../data/create_full_defect_list/defectImageEntity";
import { provide } from "../../../ioc/ioc";
import { generateUuidv4 } from "../../../util/uuidv4Util";
import { DefectImage } from "../../model/document/defectImage";
import { Response } from "../../model/response";

@provide(CreateDefectImageEntityListTask)
  .inSingletonScope()
  .done()
export class CreateDefectImageEntityListTask {
  public execute(
    defectImageList: DefectImage[]
  ): Response<DefectImageEntity[]> {
    const defectImageEntityList = defectImageList.map(
      defectImage =>
        new DefectImageEntity(
          0,
          generateUuidv4(),
          defectImage.originalName,
          defectImage.position,
          0
        )
    );

    return { isSuccess: true, data: defectImageEntityList };
  }
}
