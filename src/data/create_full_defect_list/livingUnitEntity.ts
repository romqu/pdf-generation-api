export class LivingUnitEntity {
  public readonly id: number;
  public readonly number: number;
  public readonly floorId: number;

  // tslint:disable-next-line:variable-name
  constructor(id: number, number: number, floorId: number) {
    this.id = id;
    this.number = number;
    this.floorId = floorId;
  }
}
