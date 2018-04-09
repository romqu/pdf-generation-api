export class StreetAddressEntity {
  public readonly id: number;
  public readonly postalCode: number;
  public readonly name: string;
  public readonly number: number;
  public readonly additional: string;
  public readonly defectListId: number;

  constructor(
    id: number,
    postalCode: number,
    name: string,
    // tslint:disable-next-line:variable-name
    number: number,
    additional: string,
    defectListId: number
  ) {
    this.id = id;
    this.postalCode = postalCode;
    this.name = name;
    this.number = number;
    this.additional = additional;
    this.defectListId = defectListId;
  }
}
