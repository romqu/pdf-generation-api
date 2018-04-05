import { StreetAddressEntity } from "./streetAddressEntity";

export class CreateDefectListEntity {
  public readonly id: number;
  public readonly name: string;
  public readonly clientId: number;
  public readonly streetAddressEntity: StreetAddressEntity;

  constructor(
    id: number,
    name: string,
    clientId: number,
    streetAddressEntity: StreetAddressEntity
  ) {
    this.id = id;
    this.name = name;
    this.clientId = clientId;
    this.streetAddressEntity = streetAddressEntity;
  }
}
