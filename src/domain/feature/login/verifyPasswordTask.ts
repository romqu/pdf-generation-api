import { provide } from "../../../ioc/ioc";
import { verifyValue } from "../../../util/argon2Util";
import { ResponsePromise } from "../../model/response";

@provide(VerifyPasswordTask)
  .inSingletonScope()
  .done()
export class VerifyPasswordTask {
  public execute(
    password: string,
    passwordHash: string
  ): ResponsePromise<boolean> {
    return verifyValue(passwordHash, password);
  }
}
