import { ColumnSet, IMain } from "pg-promise";

export class DefectImageEntity {
  private static columnSet: ColumnSet;

  public readonly id: number;
  public readonly name: string;
  public readonly originalName: string;
  public readonly position: number;
  public readonly defectId: number;

  constructor(
    id: number,
    name: string,
    originalName: string,
    position: number,
    defectId: number
  ) {
    this.id = id;
    this.name = name;
    this.originalName = originalName;
    this.position = position;
    this.defectId = defectId;
  }

  // tslint:disable-next-line:member-ordering
  public static getColumnSet(pgMain: IMain): ColumnSet {
    if (!DefectImageEntity.columnSet) {
      DefectImageEntity.columnSet = new pgMain.helpers.ColumnSet(
        [
          new pgMain.helpers.Column("name"),
          new pgMain.helpers.Column("original_name"),
          new pgMain.helpers.Column("position"),
          new pgMain.helpers.Column("defect_id")
        ],
        new pgMain.helpers.TableName("defect_image")
      );
    }
    return DefectImageEntity.columnSet;
  }
}
