import { ColumnSet, IMain } from "pg-promise";

import { FloorEntity } from "./floorEntity";
import { ViewParticipantEntity } from "./viewParticipantEntity";

export class StreetAddressEntity {
  private static columnSet: ColumnSet;

  public readonly id: number;
  public readonly postalCode: number;
  public readonly name: string;
  public readonly number: number;
  public readonly additional: string;
  public readonly defectListId: number;
  public readonly floorEntityList: FloorEntity[];
  public readonly viewParticipantEntityList: ViewParticipantEntity[];

  constructor(
    id: number,
    postalCode: number,
    name: string,
    // tslint:disable-next-line:variable-name
    number: number,
    additional: string,
    defectListId: number,
    floorEntityList: FloorEntity[],
    viewParticipantEntityList: ViewParticipantEntity[]
  ) {
    this.id = id;
    this.postalCode = postalCode;
    this.name = name;
    this.number = number;
    this.additional = additional;
    this.defectListId = defectListId;
    this.floorEntityList = floorEntityList;
    this.viewParticipantEntityList = viewParticipantEntityList;
  }

  // tslint:disable-next-line:member-ordering
  public static getColumnSet(pgMain: IMain): ColumnSet {
    if (!StreetAddressEntity.columnSet) {
      StreetAddressEntity.columnSet = new pgMain.helpers.ColumnSet(
        [
          new pgMain.helpers.Column("name"),
          new pgMain.helpers.Column("postal_code"),
          new pgMain.helpers.Column("number"),
          new pgMain.helpers.Column("additional"),
          new pgMain.helpers.Column("defect_list_id")
        ],
        new pgMain.helpers.TableName("street_address")
      );
    }
    return StreetAddressEntity.columnSet;
  }
}
