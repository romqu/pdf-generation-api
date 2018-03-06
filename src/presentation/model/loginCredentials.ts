import { autoserializeAs } from "cerialize/src/annotations";

export class LoginCredentials {
  @autoserializeAs(String) public readonly email: string;
  @autoserializeAs(String) public readonly password: string;
}
