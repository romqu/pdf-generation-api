import { ColumnSet, IMain } from "pg-promise";

export class ViewParticipantEntity {
  private static columnSet: ColumnSet;

  public readonly id: number;
  public readonly forename: string;
  public readonly surname: string;
  public readonly phoneNumber: number;
  public readonly email: string;
  public readonly companyName: string;
  public readonly streetAddressId: number;

  constructor(
    id: number,
    forename: string,
    surname: string,
    phoneNumber: number,
    email: string,
    companyName: string,
    streetAddressId: number
  ) {
    this.id = id;
    this.forename = forename;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.companyName = companyName;
    this.streetAddressId = streetAddressId;
  }

  // tslint:disable-next-line:member-ordering
  public static getColumnSet(pgMain: IMain): ColumnSet {
    if (!ViewParticipantEntity.columnSet) {
      ViewParticipantEntity.columnSet = new pgMain.helpers.ColumnSet(
        [
          new pgMain.helpers.Column("forename"),
          new pgMain.helpers.Column("surname"),
          new pgMain.helpers.Column("phone_number"),
          new pgMain.helpers.Column("e_mail"),
          new pgMain.helpers.Column("company_name"),
          new pgMain.helpers.Column("street_address_id")
        ],
        new pgMain.helpers.TableName("view_participant")
      );
    }
    return ViewParticipantEntity.columnSet;
  }
}
