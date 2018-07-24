import { autoserializeAs } from "cerialize";

export class GuestSessionEntity {
  @autoserializeAs(String, "uuid")
  public readonly uuid: string;

  @autoserializeAs(String, "type")
  public readonly type: string;

  constructor(uuid: string, type: string) {
    this.uuid = uuid;
    this.type = type;
  }
}
