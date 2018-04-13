import { ColumnSet, IMain } from "pg-promise";

import { StreetAddressEntity } from "./streetAddressEntity";

export class DefectListEntity {
  private static columnSet: ColumnSet;

  public readonly id: number;
  public readonly name: string;
  public readonly creationDate: Date;
  public readonly clientId: number;
  public readonly streetAddressEntity: StreetAddressEntity;

  constructor(
    id: number = 0,
    name: string,
    clientId: number,
    creationDate: Date,
    streetAddressEntity: StreetAddressEntity
  ) {
    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
    this.clientId = clientId;
    this.streetAddressEntity = streetAddressEntity;
  }

  // tslint:disable-next-line:member-ordering
  public static getColumnSet(pgMain: IMain): ColumnSet {
    if (!DefectListEntity.columnSet) {
      DefectListEntity.columnSet = new pgMain.helpers.ColumnSet(
        [
          new pgMain.helpers.Column("name"),
          new pgMain.helpers.Column("creation_date"),
          new pgMain.helpers.Column("client_id")
        ],
        new pgMain.helpers.TableName("defect_list")
      );
    }
    return DefectListEntity.columnSet;
  }
}
