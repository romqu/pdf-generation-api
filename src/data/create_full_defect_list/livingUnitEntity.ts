import { ColumnSet, IMain } from "pg-promise";

import { RoomEntity } from "./roomEntity";

export class LivingUnitEntity {
  private static columnSet: ColumnSet;

  public readonly id: number;
  public readonly number: number;
  public readonly floorId: number;
  public readonly roomEntityList: RoomEntity[];

  constructor(
    id: number,
    // tslint:disable-next-line:variable-name
    number: number,
    floorId: number,
    roomEntityList: RoomEntity[]
  ) {
    this.id = id;
    this.number = number;
    this.floorId = floorId;
    this.roomEntityList = roomEntityList;
  }

  // tslint:disable-next-line:member-ordering
  public static getColumnSet(pgMain: IMain): ColumnSet {
    if (!LivingUnitEntity.columnSet) {
      LivingUnitEntity.columnSet = new pgMain.helpers.ColumnSet(
        [
          new pgMain.helpers.Column("number"),
          new pgMain.helpers.Column("floor_id")
        ],
        new pgMain.helpers.TableName("living_unit")
      );
    }
    return LivingUnitEntity.columnSet;
  }
}
