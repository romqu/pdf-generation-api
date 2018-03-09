import { autoserialize } from "cerialize";

export class ClientSessionEntity {
  @autoserialize public readonly uuid: string;
  @autoserialize public readonly loginCredentialsId: number;
  @autoserialize public readonly email: string;

  constructor(uuid: string, loginCredentialsId: number, email: string) {
    this.uuid = uuid;
    this.loginCredentialsId = loginCredentialsId;
    this.email = email;
  }
}
