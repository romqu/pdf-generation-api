import { LoginCredentials } from "../../model/loginCredentials";
export class LoginManager {
  public execute(loginCredentials: LoginCredentials): void {
    // get password hash from db
    // verify password
    // if (true)
    //      insert client session into mDb, return session uuid
    //      get client from dDb
    //      return loginModel (sessionUuid, client)
    // else
    //      return error
  }
}
