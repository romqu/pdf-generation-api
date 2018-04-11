import { ColumnSet, IMain } from "pg-promise";

import { StreetAddressEntity } from "./streetAddressEntity";
import { ViewParticipantEntity } from "./viewParticipantEntity";

export class DefectListEntity {
  private static columnSet: ColumnSet;

  public readonly id: number;
  public readonly name: string;
  public readonly clientId: number;
  public readonly streetAddressEntity: StreetAddressEntity;
  public readonly viewParticipantEntityList: ViewParticipantEntity[];

  constructor(
    id: number = 0,
    name: string,
    clientId: number,
    streetAddressEntity: StreetAddressEntity,
    viewParticipantEntityList: ViewParticipantEntity[]
  ) {
    this.id = id;
    this.name = name;
    this.clientId = clientId;
    this.streetAddressEntity = streetAddressEntity;
    this.viewParticipantEntityList = viewParticipantEntityList;
  }

  // tslint:disable-next-line:member-ordering
  public static getColumnSet(pgMain: IMain): ColumnSet {
    if (!DefectListEntity.columnSet) {
      DefectListEntity.columnSet = new pgMain.helpers.ColumnSet(
        [
          new pgMain.helpers.Column("name"),
          new pgMain.helpers.Column("client_id")
        ],
        new pgMain.helpers.TableName("defect_list")
      );
    }
    return DefectListEntity.columnSet;
  }
}
