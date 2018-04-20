import { autoserializeAs } from "cerialize";
export class Creator {
  @autoserializeAs(Number, "client_id")
  public readonly clientId: number;

  constructor(clientId: number) {
    this.clientId = clientId;
  }
}
