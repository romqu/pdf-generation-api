import { DeepReadonly } from "../../util/deepReadOnlyUtil";
import { LivingUnitEntity } from "./livingUnitEntity";

export class FloorEntity {
  public readonly id: number;
  public readonly name: string;
  public readonly streetAddressId: number;
  public readonly livingUnitEntityList: DeepReadonly<LivingUnitEntity[]>;

  // tslint:disable-next-line:variable-name
  constructor(
    id: number,
    name: string,
    streetAddressId: number,
    livingUnitEntityList: DeepReadonly<LivingUnitEntity[]>
  ) {
    this.id = id;
    this.name = name;
    this.streetAddressId = streetAddressId;
    this.livingUnitEntityList = livingUnitEntityList;
  }
}
