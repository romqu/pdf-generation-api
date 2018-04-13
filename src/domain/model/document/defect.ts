import { DefectImage } from "./defectImage";

export class Defect {
  public readonly description: string;
  public readonly measure: string;
  public readonly companyInCharge: string;
  public readonly doneTill: string;
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
