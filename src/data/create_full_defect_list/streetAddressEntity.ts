import { DeepReadonly } from "../../util/deepReadOnlyUtil";
import { FloorEntity } from "./floorEntity";

export class StreetAddressEntity {
  public readonly id: number;
  public readonly postalCode: number;
  public readonly name: string;
  public readonly number: number;
  public readonly additional: string;
  public readonly defectListId: number;
  public readonly floorEntityList: DeepReadonly<FloorEntity[]>;

  constructor(
    id: number,
    postalCode: number,
    name: string,
    // tslint:disable-next-line:variable-name
    number: number,
    additional: string,
    defectListId: number,
    floorEntityList: DeepReadonly<FloorEntity[]>
  ) {
    this.id = id;
    this.postalCode = postalCode;
    this.name = name;
    this.number = number;
    this.additional = additional;
    this.defectListId = defectListId;
    this.floorEntityList = floorEntityList;
  }
}
