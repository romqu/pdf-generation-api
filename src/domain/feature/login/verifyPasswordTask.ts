import { provideSingleton } from "../../../core/ioc/ioc";
import { verifyValueArgon2 } from "../../../util/hashUtil";
import { ResponsePromise } from "../../model/response";

@provideSingleton(VerifyPasswordTask)
export class VerifyPasswordTask {
  public execute(
    password: string,
    passwordHash: string
  ): ResponsePromise<boolean> {
    return verifyValueArgon2(passwordHash, password);
  }
}
