import { ColumnSet, IMain } from "pg-promise";

import { LivingUnitEntity } from "./livingUnitEntity";

export class FloorEntity {
  private static columnSet: ColumnSet;

  public readonly id: number;
  public readonly name: string;
  public readonly streetAddressId: number;
  public readonly livingUnitEntityList: LivingUnitEntity[];

  // tslint:disable-next-line:variable-name
  constructor(
    id: number,
    name: string,
    streetAddressId: number,
    livingUnitEntityList: LivingUnitEntity[]
  ) {
    this.id = id;
    this.name = name;
    this.streetAddressId = streetAddressId;
    this.livingUnitEntityList = livingUnitEntityList;
  }

  // tslint:disable-next-line:member-ordering
  public static getColumnSet(pgMain: IMain): ColumnSet {
    if (!FloorEntity.columnSet) {
      FloorEntity.columnSet = new pgMain.helpers.ColumnSet(
        [
          new pgMain.helpers.Column("name"),
          new pgMain.helpers.Column("street_address_id")
        ],
        new pgMain.helpers.TableName("floor")
      );
    }
    return FloorEntity.columnSet;
  }
}
