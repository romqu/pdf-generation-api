import { verifyValue } from "../../../util/argon2Util";
import { ResponsePromise } from "../../model/response";

export class VerifyPasswordTask {
  public execute(
    password: string,
    passwordHash: string
  ): ResponsePromise<boolean> {
    return verifyValue(passwordHash, password);
  }
}
