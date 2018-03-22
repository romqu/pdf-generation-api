import { autoserializeAs } from "cerialize";

export class LoginCredentialsEntity {
  @autoserializeAs(Number) public readonly id: number;
  @autoserializeAs(String, "e_mail")
  public readonly email: string;
  @autoserializeAs(String, "password_hash")
  public readonly passwordHash: string;

  constructor(id: number, email: string, passwordHash: string) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
  }
}
