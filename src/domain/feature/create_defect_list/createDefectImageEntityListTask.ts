import { DefectImageEntity } from "../../../data/create_full_defect_list/defectImageEntity";
import { generateUuidv4 } from "../../../util/uuidv4Util";
import { DefectImage } from "../../model/document/defectImage";

export class CreateDefectImageEntityListTask {
  public execute(defectImageList: DefectImage[]): DefectImageEntity[] {
    return defectImageList.map(
      defectImage =>
        new DefectImageEntity(
          0,
          generateUuidv4(),
          defectImage.originalName,
          defectImage.position,
          0
        )
    );
  }
}
