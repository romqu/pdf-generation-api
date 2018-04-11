import { ColumnSet, IMain } from "pg-promise";

import { DefectImageEntity } from "./defectImageEntity";

export class DefectEntity {
  private static columnSet: ColumnSet;

  public readonly id: number;
  public readonly description: string;
  public readonly measure: string;
  public readonly companyInCharge: string;
  public readonly doneTill: string;
  public readonly roomId: number;
  public readonly defectImageEntityList: DefectImageEntity[];

  constructor(
    id: number,
    description: string,
    measure: string,
    companyInCharge: string,
    doneTill: string,
    roomId: number,
    defectImageEntityList: DefectImageEntity[]
  ) {
    this.id = id;
    this.description = description;
    this.measure = measure;
    this.companyInCharge = companyInCharge;
    this.doneTill = doneTill;
    this.roomId = roomId;
    this.defectImageEntityList = defectImageEntityList;
  }

  // tslint:disable-next-line:member-ordering
  public static getColumnSet(pgMain: IMain): ColumnSet {
    if (!DefectEntity.columnSet) {
      DefectEntity.columnSet = new pgMain.helpers.ColumnSet(
        [
          new pgMain.helpers.Column("description"),
          new pgMain.helpers.Column("measure"),
          new pgMain.helpers.Column("company_in_charge"),
          new pgMain.helpers.Column("additional"),
          new pgMain.helpers.Column("done_till"),
          new pgMain.helpers.Column("room_id")
        ],
        new pgMain.helpers.TableName("street_address")
      );
    }
    return DefectEntity.columnSet;
  }
}
