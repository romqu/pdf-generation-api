import { autoserializeAs, autoserializeAsArray } from "cerialize";

import { DefectImage } from "./defectImage";

export class Defect {
  @autoserializeAs(String) public readonly description: string;
  @autoserializeAs(String) public readonly measure: string;
  @autoserializeAs(String, "company_in_charge")
  public readonly companyInCharge: string;
  @autoserializeAs(String, "done_till")
  public readonly doneTill: string;
  @autoserializeAsArray(DefectImage, "defect_image_list")
  public readonly defectImageList: DefectImage[];

  constructor(
    description: string,
    measure: string,
    companyInCharge: string,
    doneTill: string,
    defectImageList: DefectImage[]
  ) {
    this.description = description;
    this.measure = measure;
    this.companyInCharge = companyInCharge;
    this.doneTill = doneTill;
    this.defectImageList = defectImageList;
  }
}
