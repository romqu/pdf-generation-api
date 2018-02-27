import { autoserialize } from "cerialize";
export class ClientSessionEntity {
  @autoserialize public readonly uuid: string;
  @autoserialize public readonly clientId: number;
  @autoserialize public readonly email: string;

  constructor(uuid: string, clientId: number, email: string) {
    this.uuid = uuid;
    this.clientId = clientId;
    this.email = email;
  }
}
