import { ColumnSet, IMain } from "pg-promise";

import { DefectEntity } from "./defectEntity";

export class RoomEntity {
  private static columnSet: ColumnSet;
  public readonly id: number;
  public readonly name: string;
  public readonly number: number;
  public readonly locationDescription: string;
  public readonly livingUnitId: number;
  public readonly defectEntityList: DefectEntity[];

  constructor(
    id: number,
    name: string,
    // tslint:disable-next-line:variable-name
    number: number,
    locationDescription: string,
    livingUnitId: number,
    defectEntityList: DefectEntity[]
  ) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.locationDescription = locationDescription;
    this.livingUnitId = livingUnitId;
    this.defectEntityList = defectEntityList;
  }

  // tslint:disable-next-line:member-ordering
  public static getColumnSet(pgMain: IMain): ColumnSet {
    if (!RoomEntity.columnSet) {
      RoomEntity.columnSet = new pgMain.helpers.ColumnSet(
        [
          new pgMain.helpers.Column("name"),
          new pgMain.helpers.Column("number"),
          new pgMain.helpers.Column("location_description"),
          new pgMain.helpers.Column("living_unit_id")
        ],
        new pgMain.helpers.TableName("room")
      );
    }
    return RoomEntity.columnSet;
  }
}
