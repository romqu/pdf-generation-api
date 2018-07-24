import { provideSingleton } from "../../../core/ioc/ioc";
import { DefectImageEntity } from "../../../data/defect_list/defectImageEntity";
import { generateUuidv4 } from "../../../util/uuidv4Util";
import { DefectImage } from "../../model/document/defectImage";
import { Response } from "../../model/response";

@provideSingleton(CreateDefectImageEntityListTask)
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
